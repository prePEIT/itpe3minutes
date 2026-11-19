// ==UserScript==
// @name         강의 캡처 연결 (정리 노트 자동 전달)
// @namespace    https://prepeit.github.io/itpe3minutes/
// @version      1.21.0
// @description  강의 화면 캡처가 만든 정리자료와 LiveWiki 대본을 영상 정리 노트 페이지로 자동으로 넘깁니다.
// @match        https://prepeit.github.io/itpe3minutes/lecture-capture.html*
// @match        https://livewiki.com/*
// @match        https://*.livewiki.com/*
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @match        https://claude.ai/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @updateURL    https://raw.githubusercontent.com/prePEIT/itpe3minutes/main/lecture-bridge.user.js
// @downloadURL  https://raw.githubusercontent.com/prePEIT/itpe3minutes/main/lecture-bridge.user.js
// @run-at       document-start
// ==/UserScript==
/* 강의 캡처 연결: keeps packages for the 영상 정리 노트 page (claude.ai) in this script's own storage, the one place
 * both the capture tool's pages and the note page can reach. Pages talk to it with window.postMessage:
 *   { lcb: 1, dir: "in", op: "ping" | "put" | "list" | "get" | "done", ... }  ->  { lcb: 1, dir: "out", op: ... }
 * Packages are put only from the capture tool's own sites (same page). They are handed out only on the claude.ai page of
 * the 영상 정리 노트 itself (its exact address), and only to the artifact frame inside that page: no other artifact or
 * page can list or read them. */
(function () {
  "use strict";
  if (window.__lcBridge) return; window.__lcBridge = true;
  var CHUNK = 1 << 20, KEEP_DAYS = 14, IDX = "lcb:index";
  var store = null;
  if (typeof GM_setValue === "function") store = {
    get: function (k) { return Promise.resolve(GM_getValue(k, null)); },
    set: function (k, v) { GM_setValue(k, v); return Promise.resolve(); },
    del: function (k) { GM_deleteValue(k); return Promise.resolve(); },
    watch: function (cb) { try { GM_addValueChangeListener(IDX, function (n, o, v, remote) { if (remote) cb(); }); } catch (e) {} }
  };
  else if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) store = {
    get: function (k) { return new Promise(function (r) { chrome.storage.local.get(k, function (o) { r(o && o[k] != null ? o[k] : null); }); }); },
    set: function (k, v) { return new Promise(function (r) { var o = {}; o[k] = v; chrome.storage.local.set(o, function () { r(); }); }); },
    del: function (k) { return new Promise(function (r) { chrome.storage.local.remove(k, function () { r(); }); }); },
    watch: function (cb) { try { chrome.storage.onChanged.addListener(function (ch, area) { if (area === "local" && ch[IDX]) cb(); }); } catch (e) {} }
  };
  if (!store) return;
  // Tampermonkey runs scripts with storage rights behind a wrapper: `window` there is not the page's window object, so
  // "did this come from this page?" must compare with the real one (unsafeWindow), and frames are told apart by .self/.top
  var W = window; try { if (typeof unsafeWindow !== "undefined" && unsafeWindow) W = unsafeWindow; } catch (e) {}
  function isSelf(src) { try { return !!src && (src === W || src === window || src === W.self || src.self === W.self); } catch (e) { return false; } }
  var host = location.hostname;
  var canPut = host === "prepeit.github.io" || /(^|\.)livewiki\.com$/.test(host) || host === "www.youtube.com" || host === "m.youtube.com";
  var NOTE_PAGES = ["/artifact/7HE9i4d6W8yGdhMBpD8Yx5"];
  function isInbox() { var top = false; try { top = W.top === W.self; } catch (e) {} return host === "claude.ai" && top && NOTE_PAGES.some(function (p) { return location.pathname.indexOf(p) === 0; }); }
  var noteFrame = null;
  function out(o, to) { try { (to || W).postMessage(Object.assign({ lcb: 1, dir: "out" }, o), "*"); } catch (e) {} }
  var queue = Promise.resolve();
  function serial(fn) { queue = queue.then(fn, fn); return queue; }
  function b64of(blob) { return new Promise(function (res, rej) { var fr = new FileReader(); fr.onload = function () { var s = String(fr.result); res(s.slice(s.indexOf(",") + 1)); }; fr.onerror = function () { rej(fr.error); }; fr.readAsDataURL(blob); }); }
  function bytesOf(b64) { var s = atob(b64), a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a; }
  async function index() {
    var idx = (await store.get(IDX)) || [];
    if (typeof idx === "string") { try { idx = JSON.parse(idx); } catch (e) { idx = []; } }
    return Array.isArray(idx) ? idx : [];
  }
  async function dropChunks(it) { for (var i = 0; i < (it.n || 0); i++) await store.del("lcb:c:" + it.key + ":" + i); }
  async function put(d) {
    var it = d.item || {}, blob = d.blob;
    if (!blob || !blob.size) return out({ op: "put-fail", ref: d.ref, why: "empty" });
    var key = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), n = Math.ceil(blob.size / CHUNK);
    for (var i = 0; i < n; i++) await store.set("lcb:c:" + key + ":" + i, await b64of(blob.slice(i * CHUNK, (i + 1) * CHUNK)));
    var idx = await index(), now = Date.now(), keep = [];
    for (var k = 0; k < idx.length; k++) {
      var x = idx[k], same = it.id && x.id === it.id && x.kind === it.kind, old = now - (x.at || 0) > KEEP_DAYS * 864e5;
      if (same || old) await dropChunks(x); else keep.push(x);
    }
    keep.push({ key: key, n: n, size: blob.size, at: now, kind: it.kind === "txt" ? "txt" : "zip", id: String(it.id || ""), name: String(it.name || "자료"), title: String(it.title || ""), words: !!it.words, type: blob.type || "" });
    await store.set(IDX, keep);
    out({ op: "put-ok", ref: d.ref, key: key });
  }
  async function list(to) { out({ op: "list", items: await index() }, to); }
  async function get(d, to) {
    var it = (await index()).filter(function (x) { return x.key === d.key; })[0];
    if (!it) return out({ op: "file", key: d.key, file: null }, to);
    var parts = [];
    for (var i = 0; i < it.n; i++) { var c = await store.get("lcb:c:" + it.key + ":" + i); if (c == null) return out({ op: "file", key: d.key, file: null }, to); parts.push(bytesOf(c)); }
    var type = it.kind === "txt" ? "text/plain" : "application/zip";
    out({ op: "file", key: d.key, file: new File(parts, it.name || (it.kind === "txt" ? "대본.txt" : "정리자료.zip"), { type: type }) }, to);
  }
  async function done(d, to) {
    var keys = d.keys || [], idx = await index(), keep = [];
    for (var k = 0; k < idx.length; k++) { if (keys.indexOf(idx[k].key) >= 0) await dropChunks(idx[k]); else keep.push(idx[k]); }
    await store.set(IDX, keep); out({ op: "list", items: keep }, to);
  }
  window.addEventListener("message", function (e) {
    var d = e.data; if (!d || d.lcb !== 1 || d.dir !== "in") return;
    // the capture tool's own page (same window): ping and put
    if (isSelf(e.source)) {
      if (d.op === "ping" && canPut) out({ op: "hello", v: 3, put: true });
      if (d.op === "put" && canPut) serial(function () { return put(d).catch(function (er) { out({ op: "put-fail", ref: d.ref, why: String(er && er.message || er) }); }); });
      return;
    }
    // the note page: its artifact frame inside the note page's own claude.ai address
    if (!isInbox() || !e.source || !(e.origin === "null" || /^https:\/\/[\w-]+(\.[\w-]+)*\.claudeusercontent\.com$/.test(e.origin || ""))) return;
    var to = e.source; noteFrame = to;
    if (d.op === "ping") return out({ op: "hello", v: 3, inbox: true }, to);
    if (d.op === "list") return serial(function () { return list(to); });
    if (d.op === "get") return serial(function () { return get(d, to); });
    if (d.op === "done") return serial(function () { return done(d, to); });
  });
  store.watch(function () { if (isInbox() && noteFrame) out({ op: "changed" }, noteFrame); });
})();
