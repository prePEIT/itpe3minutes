// ==UserScript==
// @name         강의 캡처 연결 (정리 노트 자동 전달)
// @namespace    https://prepeit.github.io/itpe3minutes/
// @version      1.22.0
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
// @grant        GM_listValues
// @updateURL    https://raw.githubusercontent.com/prePEIT/itpe3minutes/main/lecture-bridge.user.js
// @downloadURL  https://raw.githubusercontent.com/prePEIT/itpe3minutes/main/lecture-bridge.user.js
// @run-at       document-start
// ==/UserScript==
/* 강의 캡처 연결: hands packages from the capture tool to the 영상 정리 노트 page (claude.ai).
 * Pages talk to it with window.postMessage: { lcb: 1, dir: "in", op: "ping" | "put" | "list" | "get" | "done", ... } -> { lcb: 1, dir: "out", op: ... }
 * Where packages wait:
 *  - PC extension: its own storage (chrome.storage.local), read only when asked.
 *  - Tampermonkey: a script's stored values are copied into every page it runs on when the page opens, so big packages
 *    there make every page heavy (on a phone, too heavy for the scripts to start at all). So only a small list goes there,
 *    and the packages themselves stay in the work page's own browser storage (IndexedDB of prepeit.github.io). The note
 *    page fetches them by opening the work page in a small helper window (claude.ai keeps a link to windows it opens),
 *    which sends them over and closes itself.
 * Packages are put only from the capture tool's own sites. They are handed out only on the claude.ai page of the 영상
 * 정리 노트 itself (its exact address), and only to the artifact frame inside that page. */
(function () {
  "use strict";
  if (window.__lcBridge) return; window.__lcBridge = true;
  var CHUNK = 1 << 20, KEEP_DAYS = 14, IDX = "lcb:index", GM_SMALL = 2 << 20;
  // Tampermonkey runs scripts with storage rights behind a wrapper: `window` there is not the page's window object
  var W = window; try { if (typeof unsafeWindow !== "undefined" && unsafeWindow) W = unsafeWindow; } catch (e) {}
  function isSelf(src) { try { return !!src && (src === W || src === window || src === W.self || src.self === W.self); } catch (e) { return false; } }
  var store = null, mode = "";
  if (typeof GM_setValue === "function") { mode = "gm"; store = {
    get: function (k) { return Promise.resolve(GM_getValue(k, null)); },
    set: function (k, v) { GM_setValue(k, v); return Promise.resolve(); },
    del: function (k) { GM_deleteValue(k); return Promise.resolve(); },
    keys: function () { try { return Promise.resolve(GM_listValues()); } catch (e) { return Promise.resolve([]); } },
    watch: function (cb) { try { GM_addValueChangeListener(IDX, function (n, o, v, remote) { if (remote) cb(); }); } catch (e) {} }
  }; }
  else if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) { mode = "ext"; store = {
    get: function (k) { return new Promise(function (r) { chrome.storage.local.get(k, function (o) { r(o && o[k] != null ? o[k] : null); }); }); },
    set: function (k, v) { return new Promise(function (r) { var o = {}; o[k] = v; chrome.storage.local.set(o, function () { r(); }); }); },
    del: function (k) { return new Promise(function (r) { chrome.storage.local.remove(k, function () { r(); }); }); },
    keys: function () { return new Promise(function (r) { chrome.storage.local.get(null, function (o) { r(Object.keys(o || {})); }); }); },
    watch: function (cb) { try { chrome.storage.onChanged.addListener(function (ch, area) { if (area === "local" && ch[IDX]) cb(); }); } catch (e) {} }
  }; }
  if (!store) return;
  var host = location.hostname, WORK = "https://prepeit.github.io", NOTE = "https://claude.ai";
  var onWork = host === "prepeit.github.io";
  var canPut = onWork || /(^|\.)livewiki\.com$/.test(host) || host === "www.youtube.com" || host === "m.youtube.com";
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

  // ---- the work page's own storage (big packages, Tampermonkey only) ----
  var odbP = null;
  function odb() {
    return odbP || (odbP = new Promise(function (res) {
      try { var rq = indexedDB.open("lecture-capture-outbox", 1); rq.onupgradeneeded = function () { rq.result.createObjectStore("p"); };
        rq.onsuccess = function () { res(rq.result); }; rq.onerror = rq.onblocked = function () { res(null); }; } catch (e) { res(null); }
    }));
  }
  function odo(mode2, fn) {
    return odb().then(function (d) {
      if (!d) return null;
      return new Promise(function (res) { try { var tx = d.transaction("p", mode2), rq = fn(tx.objectStore("p")); tx.oncomplete = function () { res(rq && rq.result !== undefined ? rq.result : true); }; tx.onerror = tx.onabort = function () { res(null); }; } catch (e) { res(null); } });
    });
  }
  function oput(k, v) { return odo("readwrite", function (s) { return s.put(v, k); }); }
  function oget(k) { return odo("readonly", function (s) { return s.get(k); }); }
  function odel(k) { return odo("readwrite", function (s) { return s.delete(k); }); }
  function okeys() { return odo("readonly", function (s) { return s.getAllKeys(); }); }

  // ---- putting a package in ----
  async function put(d) {
    var it = d.item || {}, blob = d.blob;
    if (!blob || !blob.size) return out({ op: "put-fail", ref: d.ref, why: "빈 자료" });
    var key = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), meta = { key: key, size: blob.size, at: Date.now(), kind: it.kind === "txt" ? "txt" : "zip",
      id: String(it.id || ""), name: String(it.name || "자료"), title: String(it.title || ""), words: !!it.words, type: blob.type || "", n: 0, where: "store" };
    if (mode === "gm" && blob.size > GM_SMALL) {
      // big: into the work page's own storage; Tampermonkey keeps only the small list entry
      if (!onWork) return out({ op: "put-fail", ref: d.ref, why: "사진이 든 자료는 작업 페이지에서만 넘길 수 있어요" });
      if (!(await oput(key, blob))) return out({ op: "put-fail", ref: d.ref, why: "기기 저장 실패" });
      meta.where = "work";
    } else {
      var n = Math.ceil(blob.size / CHUNK);
      for (var i = 0; i < n; i++) await store.set("lcb:c:" + key + ":" + i, await b64of(blob.slice(i * CHUNK, (i + 1) * CHUNK)));
      meta.n = n;
    }
    var idx = await index(), now = Date.now(), keep = [];
    for (var k = 0; k < idx.length; k++) {
      var x = idx[k], same = it.id && x.id === it.id && x.kind === meta.kind, old = now - (x.at || 0) > KEEP_DAYS * 864e5;
      if (same || old) { await dropChunks(x); if (x.where === "work" && onWork) await odel(x.key); } else keep.push(x);
    }
    keep.push(meta);
    await store.set(IDX, keep);
    out({ op: "put-ok", ref: d.ref, key: key });
  }
  // tidy up: pictures stored the old way (big values in Tampermonkey's storage) and left-over work-page packages
  async function tidy() {
    var idx = await index(), keep = [], changed = false;
    for (var k = 0; k < idx.length; k++) {
      var x = idx[k];
      if (mode === "gm" && x.where !== "work" && x.size > GM_SMALL) { await dropChunks(x); changed = true; continue; }
      keep.push(x);
    }
    if (changed) await store.set(IDX, keep);
    if (mode === "gm") {
      var live = {}; keep.forEach(function (x) { live[x.key] = 1; });
      var all = await store.keys();
      for (var j = 0; j < all.length; j++) { var m = /^lcb:c:([^:]+):/.exec(all[j]); if (m && !live[m[1]]) await store.del(all[j]); }
    }
    if (onWork) {
      var ks = (await okeys()) || [], want = {}; keep.forEach(function (x) { if (x.where === "work") want[x.key] = 1; });
      for (var q = 0; q < ks.length; q++) if (!want[ks[q]]) await odel(ks[q]);
    }
  }

  // ---- the helper window (the work page opened by the note page) ----
  var relayToken = (/^#lc-relay=([\w-]+)/.exec(location.hash) || [])[1];
  if (onWork && relayToken) (function relayRole() {
    var op = null; try { op = W.opener; } catch (e) {}
    var cover = document.createElement("div");
    cover.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#fff;color:#18202C;display:flex;align-items:center;justify-content:center;padding:24px;font:16px/1.6 system-ui,sans-serif;text-align:center";
    cover.textContent = op ? "정리 노트로 자료를 보내는 중이에요… 끝나면 이 창은 저절로 닫혀요." : "이 창은 정리 노트 페이지가 자료를 가져갈 때 쓰는 창이에요. 닫아도 돼요.";
    (function mount() { if (document.body) document.body.appendChild(cover); else setTimeout(mount, 50); })();
    if (!op) return;
    function tell(o) { try { op.postMessage(Object.assign({ lcb: 1, dir: "relay-out", token: relayToken }, o), NOTE); } catch (e) {} }
    var asked = false, sent = 0;
    window.addEventListener("message", function (e) {
      var d = e.data; if (e.origin !== NOTE || !d || d.lcb !== 1 || d.dir !== "relay-in" || d.token !== relayToken) return;
      asked = true;
      if (d.op === "fetch") serial(function () { return oget(d.key).then(function (b) { sent++; cover.textContent = "정리 노트로 자료를 보내는 중이에요… (" + sent + "개)"; tell({ op: "blob", key: d.key, blob: b || null }); }); });
      if (d.op === "drop") serial(async function () { for (var i = 0; i < (d.keys || []).length; i++) await odel(d.keys[i]); });
      if (d.op === "bye") { cover.textContent = "다 보냈어요. 이 창을 닫아요."; setTimeout(function () { try { W.close(); } catch (er) {} try { window.close(); } catch (er) {} }, 300); }
    });
    var n = 0; (function hello() { if (asked || n++ > 60) return; tell({ op: "relay-ready" }); setTimeout(hello, 500); })();
  })();

  // ---- the note page side: fetching work-page packages through the helper window ----
  var relay = { win: null, token: "", ready: false, waits: {}, byeT: 0 };
  var banner = null;
  function showBanner(n) {
    if (banner) { banner.querySelector("span").textContent = "작업 페이지에 정리자료 " + n + "개가 있어요."; return; }
    banner = document.createElement("div");
    banner.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483647;max-width:calc(100vw - 32px);background:#2450B8;color:#fff;border-radius:12px;padding:10px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;font:14px/1.4 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.25)";
    var sp = document.createElement("span"); sp.textContent = "작업 페이지에 정리자료 " + n + "개가 있어요.";
    var b = document.createElement("button"); b.textContent = "가져오기"; b.style.cssText = "font:inherit;font-weight:700;border:0;border-radius:8px;padding:6px 14px;background:#fff;color:#2450B8;cursor:pointer";
    var hint = document.createElement("small"); hint.style.cssText = "flex-basis:100%;opacity:.85"; hint.textContent = "claude.ai의 팝업을 허용해 두면 다음부터는 누르지 않아도 자동으로 가져와요.";
    b.addEventListener("click", function () { if (openRelay()) hideBanner(); });
    banner.append(sp, b, hint);
    (document.body || document.documentElement).appendChild(banner);
  }
  function hideBanner() { if (banner) { banner.remove(); banner = null; } }
  function openRelay() {
    if (relay.win && !relay.win.closed) return true;
    relay.token = Math.random().toString(36).slice(2, 10); relay.ready = false;
    var w = null; try { w = W.open(WORK + "/itpe3minutes/lecture-capture.html#lc-relay=" + relay.token, "lc-relay"); } catch (e) {}
    if (!w) return false;
    relay.win = w; return true;
  }
  function askRelay(key) { try { relay.win.postMessage({ lcb: 1, dir: "relay-in", token: relay.token, op: "fetch", key: key }, WORK); } catch (e) {} }
  function relayGet(it, to) {
    relay.waits[it.key] = { it: it, to: to }; clearTimeout(relay.byeT);
    if (!openRelay()) { showBanner(Object.keys(relay.waits).length); out({ op: "need-tap", key: it.key }, to); return; }
    if (relay.ready) askRelay(it.key);
  }
  window.addEventListener("message", function (e) {
    var d = e.data; if (e.origin !== WORK || !d || d.lcb !== 1 || d.dir !== "relay-out" || !relay.token || d.token !== relay.token) return;
    if (d.op === "relay-ready" && !relay.ready) { relay.ready = true; hideBanner(); Object.keys(relay.waits).forEach(askRelay); }
    if (d.op === "blob") {
      var w = relay.waits[d.key]; if (!w) return; delete relay.waits[d.key];
      out({ op: "file", key: d.key, file: d.blob ? new File([d.blob], w.it.name || "정리자료.zip", { type: "application/zip" }) : null }, w.to);
      if (!Object.keys(relay.waits).length) relay.byeT = setTimeout(function () { try { relay.win.postMessage({ lcb: 1, dir: "relay-in", token: relay.token, op: "bye" }, WORK); } catch (er) {} }, 4000);
    }
  });

  async function list(to) { out({ op: "list", items: await index() }, to); }
  async function get(d, to) {
    var it = (await index()).filter(function (x) { return x.key === d.key; })[0];
    if (!it) return out({ op: "file", key: d.key, file: null }, to);
    if (it.where === "work") return relayGet(it, to);
    var parts = [];
    for (var i = 0; i < (it.n || 0); i++) { var c = await store.get("lcb:c:" + it.key + ":" + i); if (c == null) return out({ op: "file", key: d.key, file: null }, to); parts.push(bytesOf(c)); }
    var type = it.kind === "txt" ? "text/plain" : "application/zip";
    out({ op: "file", key: d.key, file: new File(parts, it.name || (it.kind === "txt" ? "대본.txt" : "정리자료.zip"), { type: type }) }, to);
  }
  async function done(d, to) {
    var keys = d.keys || [], idx = await index(), keep = [], work = [];
    for (var k = 0; k < idx.length; k++) { if (keys.indexOf(idx[k].key) >= 0) { await dropChunks(idx[k]); if (idx[k].where === "work") work.push(idx[k].key); } else keep.push(idx[k]); }
    await store.set(IDX, keep); out({ op: "list", items: keep }, to);
    // the work page's copies: dropped now if the helper window is open, otherwise the next time the work page opens
    if (work.length && relay.win && !relay.win.closed) { try { relay.win.postMessage({ lcb: 1, dir: "relay-in", token: relay.token, op: "drop", keys: work }, WORK); } catch (e) {} }
  }
  window.addEventListener("message", function (e) {
    var d = e.data; if (!d || d.lcb !== 1 || d.dir !== "in") return;
    if (isSelf(e.source)) {
      if (d.op === "ping" && canPut) out({ op: "hello", v: 4, put: true });
      if (d.op === "put" && canPut) serial(function () { return put(d).catch(function (er) { out({ op: "put-fail", ref: d.ref, why: String(er && er.message || er) }); }); });
      return;
    }
    if (!isInbox() || !e.source || !(e.origin === "null" || /^https:\/\/[\w-]+(\.[\w-]+)*\.claudeusercontent\.com$/.test(e.origin || ""))) return;
    var to = e.source; noteFrame = to;
    if (d.op === "ping") return out({ op: "hello", v: 4, inbox: true }, to);
    if (d.op === "list") return serial(function () { return list(to); });
    if (d.op === "get") return serial(function () { return get(d, to); });
    if (d.op === "done") return serial(function () { return done(d, to); });
  });
  store.watch(function () { if (isInbox() && noteFrame) out({ op: "changed" }, noteFrame); });
  if (!relayToken) setTimeout(function () { serial(tidy); }, 1500);
})();
