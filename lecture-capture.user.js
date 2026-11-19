// ==UserScript==
// @name         강의 화면 캡처 (유튜브)
// @namespace    https://prepeit.github.io/itpe3minutes/
// @version      1.21.0
// @description  유튜브 강의를 빠르게 재생하며 화면이 바뀐 장면만 사진으로 모아 ZIP으로 저장합니다. 영상 파일은 받지 않습니다.
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @match        https://prepeit.github.io/itpe3minutes/lecture-capture.html*
// @match        https://livewiki.com/*
// @match        https://*.livewiki.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/prePEIT/itpe3minutes/main/lecture-capture.user.js
// @downloadURL  https://raw.githubusercontent.com/prePEIT/itpe3minutes/main/lecture-capture.user.js
// @run-at       document-end
// ==/UserScript==
(function () {
  var define, exports, module;
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});
}).call(this);
/* 강의 화면 캡처 (유튜브) v3
 * Roles (decided by where this script runs):
 *  - youtube.com page (top)        : small panel → opens the work tab on the GitHub page with the links
 *  - youtube.com/watch#lc-solo=…   : processes that one video on its own page (videos that refuse embedding)
 *  - prepeit.github.io work page   : panel + coordinator; shows several YouTube players, one per part
 *  - youtube.com/embed (in a frame): worker; plays its part at up to 16x and sends the changed scenes back
 * YouTube refuses players embedded inside youtube.com itself (error 152), so the players live on the GitHub page.
 * No video file is downloaded; only the captured pictures are saved (as a ZIP). */
(function () {
  "use strict";
  if (window.__lectureCaptureLoaded) return;
  window.__lectureCaptureLoaded = true;

  var HOST_ORIGIN = "https://prepeit.github.io";
  var HOST_URL = HOST_ORIGIN + "/itpe3minutes/lecture-capture.html";
  // the "video digest" page (a claude.ai page of the owner's): the ZIPs and transcripts made here are written up there
  var DIGEST_URL = "https://claude.ai/artifact/7HE9i4d6W8yGdhMBpD8Yx5";
  var YT_ORIGIN = "https://www.youtube.com", YT_MOBILE = "https://m.youtube.com";
  // LiveWiki (livewiki.com) writes transcripts for videos that have no captions: its script is picked up there
  var LIVEWIKI_URL = "https://livewiki.com/ko";
  var PKEY = "lecture-capture-ext-prefs-v5", BKEY = "lecture-capture-best-v2", SKEY = "lecture-capture-safe-v1";
  var HOLD = 0.24, MAX_RATE = 16, YT_RATE = 2, SAMPLE = 0.25, GAP = 0.6, MOVE = 3;

  // ---------- comparing frames ----------
  // Each sampled frame becomes a small blurred grayscale "signature" (480px wide, 16px blocks).
  // Per changed pixel we ask: was the old pixel plain background (something APPEARED),
  // is the new pixel plain background (something DISAPPEARED), or neither (it was REPLACED)?
  var SIG_W = 480, BS = 16, TH = 30, MOVED_MAX = 160;
  function makeGeom(vw, vh) {
    var h = Math.max(BS, Math.round(SIG_W * vh / vw)), bx = Math.ceil(SIG_W / BS), by = Math.ceil(h / BS);
    var blockOf = new Uint16Array(SIG_W * h);
    for (var y = 0; y < h; y++) for (var x = 0; x < SIG_W; x++) blockOf[y * SIG_W + x] = ((y / BS) | 0) * bx + ((x / BS) | 0);
    return { w: SIG_W, h: h, n: SIG_W * h, bx: bx, by: by, nb: bx * by, blockOf: blockOf };
  }
  function readSig(ctx, G, v, sr) {
    if (sr) ctx.drawImage(v, sr[0], sr[1], sr[2], sr[3], 0, 0, G.w, G.h); else ctx.drawImage(v, 0, 0, G.w, G.h);
    var d = ctx.getImageData(0, 0, G.w, G.h).data, n = G.n, w = G.w, h = G.h;
    var g = new Uint8Array(n), tmp = new Uint16Array(n), out = new Uint8Array(n), i, p, x, y, r;
    for (i = 0, p = 0; i < n; i++, p += 4) g[i] = (d[p] * 77 + d[p + 1] * 150 + d[p + 2] * 29) >> 8;
    for (y = 0; y < h; y++) {
      r = y * w;
      for (x = 0; x < w; x++) tmp[r + x] = (x > 0 ? g[r + x - 1] : g[r + x]) + g[r + x] + (x < w - 1 ? g[r + x + 1] : g[r + x]);
    }
    var sum = 0, sq = 0;
    for (y = 0; y < h; y++) {
      r = y * w; var up = y > 0 ? r - w : r, dn = y < h - 1 ? r + w : r;
      for (x = 0; x < w; x++) { var val = ((tmp[up + x] + tmp[r + x] + tmp[dn + x]) / 9) | 0; out[r + x] = val; sum += val; sq += val * val; }
    }
    var mean = sum / n;
    return { g: out, modes: new Int16Array(G.nb).fill(-1), blank: (sq / n - mean * mean) < 64 };
  }
  function blockMode(sig, G, b) {
    if (sig.modes[b] >= 0) return sig.modes[b];
    var hist = new Uint16Array(64), x0 = (b % G.bx) * BS, y0 = ((b / G.bx) | 0) * BS;
    var x1 = Math.min(G.w, x0 + BS), y1 = Math.min(G.h, y0 + BS), best = 0;
    for (var y = y0; y < y1; y++) for (var x = x0; x < x1; x++) hist[sig.g[y * G.w + x] >> 2]++;
    for (var i = 1; i < 64; i++) if (hist[i] > hist[best]) best = i;
    return (sig.modes[b] = best * 4 + 2);
  }
  function grow(B, x, y) { if (x < B[0]) B[0] = x; if (y < B[1]) B[1] = y; if (x > B[2]) B[2] = x; if (y > B[3]) B[3] = y; }
  function analyze(A, B, G, mask) {
    var a = A.g, b = B.g, n = G.n, w = G.w, bo = G.blockOf;
    var r = { C: 0, ap: 0, ds: 0, md: 0, apB: [1e9, 1e9, -1, -1], dsB: [1e9, 1e9, -1, -1] };
    for (var i = 0; i < n; i++) {
      var df = a[i] - b[i]; if (df < TH && df > -TH) continue;
      var blk = bo[i]; if (mask[blk]) continue;
      r.C++;
      var oldBg = Math.abs(a[i] - blockMode(A, G, blk)) <= 18, newBg = Math.abs(b[i] - blockMode(B, G, blk)) <= 18;
      if (oldBg && !newBg) { r.ap++; grow(r.apB, i % w, (i / w) | 0); }
      else if (newBg && !oldBg) { r.ds++; grow(r.dsB, i % w, (i / w) | 0); }
      else r.md++;
    }
    return r;
  }
  // a small thing vanished in one spot and the same-sized thing appeared somewhere else: a moving mouse pointer.
  // Its size is remembered (ctx.ptr), so later a lone pointer appearing, vanishing or nudging in place is recognised too.
  function isMovedPointer(r) {
    if (!r.ap || !r.ds || r.ap > MOVED_MAX || r.ds > MOVED_MAX || r.md > 0.25 * r.C) return false;
    var ratio = r.ap / r.ds; if (ratio < 0.33 || ratio > 3) return false;
    var A = r.apB, D = r.dsB, gap = 3;
    return A[2] + gap < D[0] || D[2] + gap < A[0] || A[3] + gap < D[1] || D[3] + gap < A[1];
  }
  function isPointerOnly(r, ctx) {
    if (r.md > 0.25 * r.C + 4) return false;
    if (isMovedPointer(r)) {
      var w = (r.apB[2] - r.apB[0] + r.dsB[2] - r.dsB[0]) / 2 + 1, h = (r.apB[3] - r.apB[1] + r.dsB[3] - r.dsB[1]) / 2 + 1, px = (r.ap + r.ds) / 2;
      var p = ctx.ptr;
      ctx.ptr = p ? { px: p.px * 0.8 + px * 0.2, w: p.w * 0.8 + w * 0.2, h: p.h * 0.8 + h * 0.2, seen: p.seen + 1 } : { px: px, w: w, h: h, seen: 1 };
      return true;
    }
    var P = ctx.ptr; if (!P || P.seen < 2) return false;
    var B = [Math.min(r.apB[0], r.dsB[0]), Math.min(r.apB[1], r.dsB[1]), Math.max(r.apB[2], r.dsB[2]), Math.max(r.apB[3], r.dsB[3])];
    if (B[2] < 0) return false;
    return r.C <= 2.5 * P.px && (B[2] - B[0] + 1) <= 2 * P.w + 4 && (B[3] - B[1] + 1) <= 2 * P.h + 4;
  }
  function isNewScene(r, minPx, ctx) { return r.C >= minPx && !isPointerOnly(r, ctx); }
  // only new content on empty background, nothing erased or rewritten.
  // The slack is tiny (anti-aliased edges); the only bigger thing allowed to vanish is the mouse pointer once its size is known.
  function isAdditive(r, ctx) {
    if (!r.ap) return false;
    var slack = Math.max(0.04 * r.C, 6), P = ctx && ctx.ptr;
    if (P && P.seen >= 2 && r.ds > 0) {
      var w = r.dsB[2] - r.dsB[0] + 1, h = r.dsB[3] - r.dsB[1] + 1;
      if (r.ds <= 2.5 * P.px && w <= 2 * P.w + 4 && h <= 2 * P.h + 4) slack += r.ds;
    }
    return r.ds + r.md <= slack;
  }

  // blocks that keep changing between samples (presenter camera, captions, clocks) are learned and ignored
  function blockChanges(A, B, G) {
    var cnt = new Uint16Array(G.nb), a = A.g, b = B.g, bo = G.blockOf, hit = 0;
    for (var i = 0; i < G.n; i++) { var df = a[i] - b[i]; if (df >= TH || df <= -TH) cnt[bo[i]]++; }
    for (var k = 0; k < G.nb; k++) if (cnt[k] >= 32) hit++;
    return { cnt: cnt, frac: hit / G.nb };
  }
  // prev: the current mask (a block stays ignored until it has been quiet for a while)
  function buildMask(ema, G, job, prev) {
    var nb = G.nb, bx = G.bx, by = G.by, m = new Uint8Array(nb), out = new Uint8Array(nb), c = 0, b, x, y;
    for (b = 0; b < nb; b++) if (ema[b] >= 0.5 || (prev && prev.core && prev.core[b] && ema[b] >= 0.2)) m[b] = 1;
    // a presenter camera or caption bar is a rectangle: fill each moving area's bounding box, plus one block around it
    var seen = new Uint8Array(nb), stack = [];
    for (b = 0; b < nb; b++) {
      if (!m[b] || seen[b]) continue;
      var size = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1; stack.push(b); seen[b] = 1;
      while (stack.length) {
        var cur = stack.pop(), cx = cur % bx, cy = (cur / bx) | 0; size++;
        if (cx < x0) x0 = cx; if (cx > x1) x1 = cx; if (cy < y0) y0 = cy; if (cy > y1) y1 = cy;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
          var nx = cx + dx, ny = cy + dy, nbk = ny * bx + nx;
          if (nx >= 0 && nx < bx && ny >= 0 && ny < by && m[nbk] && !seen[nbk]) { seen[nbk] = 1; stack.push(nbk); }
        }
      }
      // only areas at the edge of the picture (a presenter camera in a corner, a caption bar) are ignored;
      // anything moving in the middle (handwriting, an animation on the slide) is content and is never ignored
      var nearEdge = x0 <= 2 || y0 <= 2 || x1 >= bx - 3 || y1 >= by - 3;
      if (!nearEdge || (x1 - x0 + 1) * (y1 - y0 + 1) > 0.3 * nb) continue;
      var fill = (x1 - x0 + 1) * (y1 - y0 + 1) <= Math.max(4, 3 * size);
      for (y = Math.max(0, y0 - 1); y <= Math.min(by - 1, y1 + 1); y++) for (x = Math.max(0, x0 - 1); x <= Math.min(bx - 1, x1 + 1); x++) {
        if (fill) { out[y * bx + x] = 1; continue; }
        for (var ey = -1; ey <= 1; ey++) for (var ex = -1; ex <= 1; ex++) { var sy = y + ey, sx = x + ex; if (sy >= y0 && sy <= y1 && sx >= x0 && sx <= x1 && m[sy * bx + sx]) { out[y * bx + x] = 1; } }
      }
    }
    for (b = 0; b < nb; b++) c += out[b];
    out.core = m;
    if (c > 0.45 * nb) { job.maskPct = 0; job.maskOff = true; var none = new Uint8Array(nb); none.core = m; return none; }
    job.maskPct = c / nb; job.maskOff = false;
    return out;
  }



  // ---------- small helpers ----------
  function fmt(sec) {
    sec = Math.max(0, Math.floor(sec));
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return String(h).padStart(2, "0") + "h" + String(m).padStart(2, "0") + "m" + String(s).padStart(2, "0") + "s";
  }
  function mins(sec) { if (!isFinite(sec)) return "계산 중"; if (sec < 60) return "1분 미만"; return "약 " + Math.round(sec / 60) + "분"; }
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function safeName(s) { return String(s || "youtube").replace(/[\\/:*?"<>|\x00-\x1f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 80) || "youtube"; }
  function parseId(s) {
    s = String(s || "").trim(); if (!s) return null;
    if (/^[\w-]{11}$/.test(s)) return s;
    var u; try { u = new URL(/^https?:\/\//i.test(s) ? s : "https://" + s); } catch (e) { return null; }
    var host = u.hostname.toLowerCase().replace(/^(www|m|music)\./, ""), id = null;
    if (host === "youtu.be") id = u.pathname.split("/")[1];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      id = u.searchParams.get("v");
      var m = u.pathname.match(/^\/(?:live|embed|v|shorts)\/([\w-]{11})/); if (!id && m) id = m[1];
    }
    return id && /^[\w-]{11}/.test(id) ? id.slice(0, 11) : null;
  }
  function parseLinks(text) {
    var ids = [], bad = 0;
    String(text || "").split(/\n+/).forEach(function (line) {
      if (!line.trim()) return;
      var id = null; line.trim().split(/\s+/).some(function (p) { id = parseId(p); return !!id; });
      if (id) { if (ids.indexOf(id) < 0) ids.push(id); } else bad++;
    });
    return { ids: ids, bad: bad };
  }
  function watchUrl(id) { return YT_ORIGIN + "/watch?v=" + id; }
  function bufferedAhead(v) {
    try { for (var i = 0; i < v.buffered.length; i++) if (v.buffered.start(i) <= v.currentTime + 0.2 && v.buffered.end(i) >= v.currentTime) return v.buffered.end(i) - v.currentTime; } catch (e) {}
    return 0;
  }
  function api(mp) { try { return (mp && mp.wrappedJSObject) || mp || {}; } catch (e) { return mp || {}; } }
  function isAd(mp) { return !!(mp && mp.classList && (mp.classList.contains("ad-showing") || mp.classList.contains("ad-interrupting"))); }
  function trySkipAd(doc) {
    var b = (doc || document).querySelector(".ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern");
    if (b && b.offsetParent !== null) { try { b.click(); } catch (e) {} }
  }
  function dismissStillWatching(doc) {
    var b = (doc || document).querySelector("yt-confirm-dialog-renderer #confirm-button button, yt-confirm-dialog-renderer #confirm-button");
    if (b && b.offsetParent !== null) { try { b.click(); } catch (e) {} }
  }
  // "det": a player that only looks for changes. The comparison shrinks every picture to 480 dots wide anyway, so
  // 480p shows it the same thing as 1080p at a fifth of the decoding work and memory. The photos are taken afterwards,
  // by another player, in the quality that was chosen.
  function setQuality(mp, mode) {
    try {
      var a = api(mp), lv = a.getAvailableQualityLevels ? Array.prototype.slice.call(a.getAvailableQualityLevels()) : [];
      // the chosen quality, or the best one below it that this video has ("max": the best it has)
      var order = ["highres", "hd2880", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small"];
      var q = mode && mode !== "det" ? mode : prefs.quality;
      var from = mode === "det" ? order.indexOf("large") : q === "max" ? 0 : Math.max(0, order.indexOf(q));
      var best = order.slice(from).filter(function (q) { return lv.indexOf(q) >= 0; })[0];
      if (!best && mode === "det") best = lv.filter(function (q) { return order.indexOf(q) >= 0; }).pop();   // nothing that low: the lowest there is
      if (best && a.setPlaybackQualityRange) a.setPlaybackQualityRange(best, best);
    } catch (e) {}
  }
  // what the player says when it refuses to play (error screen text, or the player's own status)
  function playerError(doc) {
    var mp = doc.getElementById("movie_player");
    try {
      var a = api(mp), pr = mp && a.getPlayerResponse && a.getPlayerResponse();
      var st = pr && pr.playabilityStatus && pr.playabilityStatus.status;
      if (st && st !== "OK" && st !== "LIVE_STREAM_OFFLINE") return (pr.playabilityStatus.reason || st);
    } catch (e) {}
    var box = doc.querySelector(".ytp-error, .ytp-embed-error, .ytp-error-content");
    if (box && box.offsetParent !== null) return (box.textContent || "").replace(/\s+/g, " ").trim() || "error";
    var txt = mp ? (mp.innerText || "") : (doc.body ? doc.body.innerText || "" : "");
    if (/오류 코드|Error code|볼 수 없습니다|Video unavailable|동영상을 재생할 수 없음/i.test(txt)) return txt.replace(/\s+/g, " ").trim().slice(0, 120);
    return null;
  }

  var prefs = Object.assign({ workers: 0, quality: "hd1080", minPx: 30, ignoreMoving: true, ignoreCaptions: false, merge: true, every: 1, dedup: true, subs: false, mode: "capture", open: true }, load(PKEY, {}));
  // 1.15: a changed burned-in caption is a new photo (a scene repeats only when picture AND caption are the same).
  // Settings saved before still said "ignore captions": switch that once.
  if (prefs.capsV !== 2) { prefs.ignoreCaptions = false; prefs.capsV = 2; }
  // 1.17: screen capture and "material for a write-up" are two separate jobs. Plain capture saves photos only again.
  if (prefs.subsV !== 2) { prefs.subs = false; prefs.subsV = 2; }
  // "영상 정리" mode: the transcript plus the scenes, gathered quickly (fewer looks, 720p) for the digest page.
  // These settings only hold while such a job runs; the user's own capture settings are kept as they were.
  var DIGEST_SET = { every: 3, quality: "hd720", dedup: true, subs: true, ignoreCaptions: false };
  var userSet = null;
  function enterMode() { if (prefs.mode === "digest" && !userSet) { userSet = {}; Object.keys(DIGEST_SET).forEach(function (k) { userSet[k] = prefs[k]; }); Object.assign(prefs, DIGEST_SET); } }
  function leaveMode() { if (userSet) { Object.assign(prefs, userSet); userSet = null; } }
  function savePrefs() { save(PKEY, Object.assign({}, prefs, userSet || {})); }
  var EVERY_OPTS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  function fixEvery(x) { x = Number(x) || 1; var best = 1; EVERY_OPTS.forEach(function (o) { if (Math.abs(o - x) < Math.abs(best - x) - 1e-9) best = o; }); return best; }
  prefs.every = fixEvery(prefs.every);
  var stopReq = false;

  // ---------- capture engine (shared) ----------
  // The comparison, with the mouse pointer taken out first. On a page full of text the pointer sits on top of letters,
  // so "something appeared on empty background" can't spot it. Instead: the changed dots are grouped into spots, and two
  // small spots of about the same size where the picture that left one spot is the picture that arrived at the other
  // (the same arrow, moved) are left out. A changed digit or word is not the same picture in two places, so it stays.

  var GW = 480;
  // The mouse pointer's own picture, learned the first times it is seen moving clearly (two separate spots). With it a
  // pointer that only crept a little over text (one smeared spot, not two) is still recognised: the arrow is found where
  // the change is, in the old picture at one place and in the new one at another, and the change is nothing else.
  function learnTpl(A, B, sp, pctx) {
    var w = GW, tw = sp.x1 - sp.x0 + 1, th = sp.y1 - sp.y0 + 1, px = [];
    if (tw < 3 || th < 4 || tw > 30 || th > 34) return;
    for (var y = sp.y0; y <= sp.y1; y++) for (var x = sp.x0; x <= sp.x1; x++) {
      var j = y * w + x, d = A.g[j] - B.g[j];
      if (d >= TH || d <= -TH) px.push(x - sp.x0, y - sp.y0, B.g[j]);
    }
    var n = px.length / 3, old = pctx.tpl;
    if (n < 10 || n > 300) return;
    if (old && old.seen >= 3 && (n < old.n * 0.5 || n > old.n * 2)) return;
    pctx.tpl = { w: tw, h: th, n: n, px: px, seen: old ? old.seen + 1 : 1 };
  }
  
  function tplAt(S, x, y, T, gw, gh) {
    var g = S.g, p = T.px, sum = 0;
    for (var k = 0; k < p.length; k += 3) {
      var xx = x + p[k], yy = y + p[k + 1];
      if (xx < 0 || yy < 0 || xx >= gw || yy >= gh) return 999;
      sum += Math.abs(g[yy * gw + xx] - p[k + 2]);
    }
    return sum / T.n;
  }
  // where in S the arrow is that is not in O at the same place: best (score in S) against (score in O)
  function findTpl(S, O, x0, y0, x1, y1, T, gw, gh) {
    var best = { s: 999, o: 0, x: 0, y: 0 }, bestD = 1e9;
    for (var y = y0 - T.h + 1; y <= y1; y++) for (var x = x0 - T.w + 1; x <= x1; x++) {
      var s = tplAt(S, x, y, T, gw, gh); if (s > 26) continue;
      var o = tplAt(O, x, y, T, gw, gh); if (s - o < bestD) { bestD = s - o; best = { s: s, o: o, x: x, y: y }; }
    }
    return best;
  }
  function pointerCrept(A, B, G, mask, pctx, r) {
    var T = pctx && pctx.tpl;
    if (!T || T.seen < 2 || r.C < 8 || r.C > Math.max(150, 4 * T.n)) return null;
    var a = A.g, b = B.g, w = G.w, h = G.h, bo = G.blockOf, i, df, pts = [];
    for (i = 0; i < G.n; i++) {
      df = a[i] - b[i]; if (df < TH && df > -TH) continue; if (mask[bo[i]]) continue;
      pts.push(i % w, (i / w) | 0); if (pts.length > 1200) return null;
    }
    if (!pts.length) return null;
    // changed dots in clumps (8-dot cells, touching cells join): the pointer leaves one clump where it was and makes one
    // where it is now, or a single smeared clump when it crept only a little
    var cw = (w >> 3) + 1, cell = new Int32Array(cw * ((h >> 3) + 1)).fill(-1), clumps = [], k, q;
    for (k = 0; k < pts.length; k += 2) cell[(pts[k + 1] >> 3) * cw + (pts[k] >> 3)] = -2;
    for (k = 0; k < pts.length; k += 2) {
      var c0 = (pts[k + 1] >> 3) * cw + (pts[k] >> 3); if (cell[c0] !== -2) continue;
      var id = clumps.length, st = [c0], cl = { x0: 1e9, y0: 1e9, x1: -1, y1: -1 }; cell[c0] = id; clumps.push(cl);
      if (clumps.length > 3) return null;
      while (st.length) {
        var cc = st.pop(), cx = cc % cw, cy = (cc / cw) | 0;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
          var nk = (cy + dy) * cw + cx + dx; if (cx + dx < 0 || cx + dx >= cw || nk < 0 || nk >= cell.length) continue;
          if (cell[nk] === -2) { cell[nk] = id; st.push(nk); }
        }
      }
    }
    for (k = 0; k < pts.length; k += 2) {
      var cl2 = clumps[cell[(pts[k + 1] >> 3) * cw + (pts[k] >> 3)]];
      if (pts[k] < cl2.x0) cl2.x0 = pts[k]; if (pts[k] > cl2.x1) cl2.x1 = pts[k]; if (pts[k + 1] < cl2.y0) cl2.y0 = pts[k + 1]; if (pts[k + 1] > cl2.y1) cl2.y1 = pts[k + 1];
    }
    var boxes = [], inA = null, inB = null;
    for (q = 0; q < clumps.length; q++) {
      var c = clumps[q];
      if (c.x1 - c.x0 + 1 > 2 * T.w + 20 || c.y1 - c.y0 + 1 > 2 * T.h + 20) return null;
      var pa = findTpl(A, B, c.x0, c.y0, c.x1, c.y1, T, w, h), pb = findTpl(B, A, c.x0, c.y0, c.x1, c.y1, T, w, h);
      // the arrow was here before and is gone now (or the other way round): clearly better where it is than where it was
      if (pa.s <= 26 && pa.o >= pa.s + 12) { boxes.push(pa); if (!inA) inA = pa; }
      if (pb.s <= 26 && pb.o >= pb.s + 12) { boxes.push(pb); if (!inB) inB = pb; }
    }
    if (!inA || !inB || (inA.x === inB.x && inA.y === inB.y)) return null;
    var out = 0;
    for (k = 0; k < pts.length; k += 2) {
      var x = pts[k], y = pts[k + 1], hit = false;
      for (q = 0; q < boxes.length && !hit; q++) { var p = boxes[q]; hit = x >= p.x - 1 && x <= p.x + T.w && y >= p.y - 1 && y <= p.y + T.h; }
      if (!hit && ++out > 3) return null;
    }
    var m2 = new Uint8Array(mask);
    boxes.forEach(function (p) {
      for (var by = Math.max(0, (p.y - 1) >> 4); by <= Math.min(G.by - 1, (p.y + T.h) >> 4); by++)
        for (var bx = Math.max(0, (p.x - 1) >> 4); bx <= Math.min(G.bx - 1, (p.x + T.w) >> 4); bx++) m2[by * G.bx + bx] = 1;
    });
    return analyze(A, B, G, m2);
  }
  function analyzeX(A, B, G, mask, pctx) {
    var r = analyzeX0(A, B, G, mask, pctx);
    if (pctx && isNewScene(r, 1, pctx)) { var r2 = pointerCrept(A, B, G, mask, pctx, r); if (r2) return r2; }
    return r;
  }
  function analyzeX0(A, B, G, mask, pctx) {
    GW = G.w;
    var r = analyze(A, B, G, mask);
    if (r.C < 8 || r.C > 1500) return r;
    var a = A.g, b = B.g, w = G.w, h = G.h, n = G.n, bo = G.blockOf, cw = (w >> 2) + 1, chh = (h >> 2) + 1;
    var cells = new Int32Array(cw * chh), i, df;
    for (i = 0; i < n; i++) { df = a[i] - b[i]; if (df < TH && df > -TH) continue; if (mask[bo[i]]) continue; cells[((((i / w) | 0) >> 2) * cw) + ((i % w) >> 2)]++; }
    var lab = new Int16Array(cw * chh).fill(-1), spots = [], stack = [];
    for (var c = 0; c < cells.length; c++) {
      if (!cells[c] || lab[c] >= 0) continue;
      var id = spots.length; if (id > 30) return r;
      spots.push({ x0: 1e9, y0: 1e9, x1: -1, y1: -1, px: 0 }); stack.push(c); lab[c] = id;
      while (stack.length) {
        var cur = stack.pop(), cx = cur % cw, cy = (cur / cw) | 0;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
          var nx = cx + dx, ny = cy + dy, k = ny * cw + nx;
          if (nx >= 0 && nx < cw && ny >= 0 && ny < chh && cells[k] && lab[k] < 0) { lab[k] = id; stack.push(k); }
        }
      }
    }
    for (i = 0; i < n; i++) {
      df = a[i] - b[i]; if (df < TH && df > -TH) continue; if (mask[bo[i]]) continue;
      var x = i % w, y = (i / w) | 0, sp = spots[lab[(y >> 2) * cw + (x >> 2)]];
      sp.px++; if (x < sp.x0) sp.x0 = x; if (x > sp.x1) sp.x1 = x; if (y < sp.y0) sp.y0 = y; if (y > sp.y1) sp.y1 = y;
    }
    var small = spots.filter(function (s) { return s.x1 - s.x0 < 18 && s.y1 - s.y0 < 22 && s.px <= 200; });
    if (small.length < 2) return r;
    // what was at spot F before against what is at spot T after, best of small shifts: a moved arrow is the same picture
    // in both (same colours, same change). Letters that changed in two places are not, unless they are the very same
    // letters in the same style - and then only the spots where both match are left out.
    function same(F, T) {
      var best = 1e9;
      for (var oy = -2; oy <= 2; oy++) for (var ox = -2; ox <= 2; ox++) {
        var sum = 0, cnt = 0, hitT = 0;
        for (var y = F.y0; y <= F.y1; y++) for (var x = F.x0; x <= F.x1; x++) {
          var j = y * w + x, d0 = a[j] - b[j]; if (d0 < TH && d0 > -TH) continue;
          var tx = T.x0 + (x - F.x0) + ox, ty = T.y0 + (y - F.y0) + oy; if (tx < 0 || ty < 0 || tx >= w || ty >= h) { sum += 255; cnt++; continue; }
          // the arrow's own colours: before at F = after at T, and the change has the same direction at both
          var k2 = ty * w + tx, d1 = b[k2] - a[k2]; sum += Math.max(Math.abs(a[j] - b[k2]), Math.abs(d0 - d1)); cnt++; if (d1 >= TH || d1 <= -TH) hitT++;
        }
        if (cnt >= 10 && hitT >= 0.7 * cnt && sum / cnt < best) best = sum / cnt;
      }
      return best;
    }
    var m2 = null;
    for (var p = 0; p < small.length; p++) for (var q = p + 1; q < small.length; q++) {
      var S = small[p], T = small[q];
      if (Math.abs((S.x1 - S.x0) - (T.x1 - T.x0)) > 4 || Math.abs((S.y1 - S.y0) - (T.y1 - T.y0)) > 4) continue;
      if (Math.abs(S.px - T.px) > 0.5 * Math.max(S.px, T.px)) continue;
      // (two parts of one changed letter are close together; an arrow that was moved far enough to leave two spots is not)
      if (Math.abs((S.x0 + S.x1) - (T.x0 + T.x1)) < 40 && Math.abs((S.y0 + S.y1) - (T.y0 + T.y1)) < 40) continue;
      var sST = same(S, T), sTS = same(T, S);
      if (Math.min(sST, sTS) > 20) continue;
      if (pctx) learnTpl(A, B, sST <= sTS ? T : S, pctx);
      m2 = m2 || new Uint8Array(mask);
      [S, T].forEach(function (sp) {
        for (var yy = Math.max(0, (sp.y0 - 1) >> 4); yy <= Math.min(G.by - 1, (sp.y1 + 1) >> 4); yy++)
          for (var xx = Math.max(0, (sp.x0 - 1) >> 4); xx <= Math.min(G.bx - 1, (sp.x1 + 1) >> 4); xx++) m2[yy * G.bx + xx] = 1;
      });
    }
    return m2 ? analyze(A, B, G, m2) : r;
  }

  function makeCapturer(G, video, full, fctx) {
    var small = document.createElement("canvas"); small.width = G.w; small.height = G.h;
    var sctx = small.getContext("2d", { willReadFrequently: true }); sctx.imageSmoothingQuality = "medium";
    var minPx = prefs.minPx, useCam = prefs.ignoreMoving !== false, useCaps = prefs.ignoreCaptions !== false, useMask = useCam || useCaps, doMerge = prefs.merge, dedup = prefs.dedup !== false, settle = 5;
    var C = { ema: new Float32Array(G.nb), mask: new Uint8Array(G.nb), raw: null, scenes: [], kept: [], pctx: { ptr: null }, prevSig: null, prevT: 0, pending: null, bad: false, samples: 0, blanks: 0 };
    // one more block around each ignored area: the frame and shoulders of a camera picture move less often than the face
    function widen(m) {
      var bx = G.bx, by = G.by, o = new Uint8Array(G.nb), x, y, dx, dy;
      for (y = 0; y < by; y++) for (x = 0; x < bx; x++) {
        if (!m[y * bx + x]) continue;
        for (dy = -1; dy <= 1; dy++) for (dx = -1; dx <= 1; dx++) { var nx = x + dx, ny = y + dy; if (nx >= 0 && nx < bx && ny >= 0 && ny < by) o[ny * bx + nx] = 1; }
      }
      return o;
    }
    function snap() {
      if (C.noSnap) return null;
      var w = video.videoWidth, hh = video.videoHeight;
      if (full.width !== w || full.height !== hh) { full.width = w; full.height = hh; }
      fctx.drawImage(video, 0, 0, w, hh);
      return new Promise(function (r) { full.toBlob(function (b) { r(b); }, "image/jpeg", 0.9); });
    }
    // learning only: which parts keep moving (presenter camera, captions) — nothing is kept
    // What keeps moving (a presenter camera, captions) is learned from looks a quarter second apart: a camera picture,
    // even a nearly still one, differs a little between almost every such pair, while a slide only changes now and then.
    // Looks further apart can't tell those two apart, so they only confirm what is already known (or fade it out slowly).
    var seenC = new Float32Array(G.nb), hitC = new Float32Array(G.nb), capScore = new Float32Array(G.nb);
    var onNow = new Uint8Array(G.nb), feed = new Float32Array(G.nb), capRow = Math.floor(G.by * 0.65);
    // Two kinds of things keep changing by themselves:
    //  - a presenter camera: changes between almost every two looks a quarter second apart;
    //  - burned-in captions (lower part of the picture): a new line every few seconds while the rest stays.
    // A new slide or a scroll changes most of the picture at once and is not counted. Only areas along the edge
    // of the picture are ever ignored (see buildMask), so handwriting or animation on the slide itself is kept.
    function learnMoving(sig, t) {
      if (C.prevSig && Math.abs(t - C.prevT) < 0.2) return;
      if (useMask && C.prevSig) {
        var ch = blockChanges(C.prevSig, sig, G), dt = Math.abs(t - C.prevT), close = dt <= 0.4, fade = Math.exp(-Math.min(dt, 30) / 30);
        if (ch.frac < 0.15) {
          for (var b = 0; b < G.nb; b++) {
            var hit = ch.cnt[b] >= MOVE ? 1 : 0;
            if (close) { seenC[b] = seenC[b] * 0.98 + 1; hitC[b] = hitC[b] * 0.98 + hit; }
            // captions: how many times this block changed on its own lately (fades out over about 30 s of video)
            capScore[b] = useCaps ? capScore[b] * fade + ((b / G.bx | 0) >= capRow && ch.cnt[b] >= 12 ? 1 : 0) : 0;
            var rc = useCam && seenC[b] >= 8 ? hitC[b] / seenC[b] : 0;
            if (rc >= 0.36 || capScore[b] >= 2.5) onNow[b] = 1; else if (rc < 0.28 && capScore[b] < 0.8) onNow[b] = 0;
            feed[b] = onNow[b];
          }
          if (!useCaps) dropCaptionBand(feed);
          C.raw = buildMask(feed, G, {}, null); C.mask = widen(C.raw);
        }
      }
      C.prevSig = sig; C.prevT = t;
    }
    // When caption changes are to be photographed, a wide strip low in the picture is never ignored, even if it
    // changes as often as a camera (captions that roll in word by word). A presenter camera is a box, not a strip.
    function dropCaptionBand(m) {
      var bx = G.bx, by = G.by, lab = new Int32Array(G.nb).fill(-1), st = [], id = 0;
      for (var b0 = 0; b0 < G.nb; b0++) {
        if (!m[b0] || lab[b0] >= 0) continue;
        var cells = [], x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1; lab[b0] = id; st.push(b0);
        while (st.length) {
          var c = st.pop(), cx = c % bx, cy = (c / bx) | 0; cells.push(c);
          if (cx < x0) x0 = cx; if (cx > x1) x1 = cx; if (cy < y0) y0 = cy; if (cy > y1) y1 = cy;
          [c - 1, c + 1, c - bx, c + bx].forEach(function (k, i) {
            if (k < 0 || k >= G.nb || (i === 0 && cx === 0) || (i === 1 && cx === bx - 1)) return;
            if (m[k] && lab[k] < 0) { lab[k] = id; st.push(k); }
          });
        }
        if (y1 >= capRow && x1 - x0 + 1 >= 0.3 * bx && y1 - y0 + 1 <= 0.3 * by) cells.forEach(function (k) { m[k] = 0; });
        id++;
      }
    }
    C.learn = function (t) {
      var sig;
      try { sig = readSig(sctx, G, video, null); } catch (e) { C.bad = true; return; }
      C.samples++; if (sig.blank) C.blanks++;
      var before = C.prevSig;
      learnMoving(sig, t);
      if (before) { try { isPointerOnly(analyze(before, sig, G, C.mask), C.pctx); } catch (e) {} }
    };
    // Is the new screen still changing (a slide sliding in, a scroll)? A small spot about the size of the mouse pointer
    // that moved since the last look is not: otherwise a pointer gliding over text keeps the screen "moving" for up to
    // 5 s, and a caption that changes in that time would be lost.
    function stillMoving(A, B) {
      var r = analyzeX(A, B, G, C.mask, C.pctx);
      if (!isNewScene(r, minPx, C.pctx)) return false;
      var P = C.pctx.ptr, known = P && P.seen >= 2;
      var cMax = known ? Math.max(120, 3 * P.px) : 200, wMax = known ? 2 * P.w + 12 : 30, hMax = known ? 2 * P.h + 12 : 34;
      var x0 = Math.min(r.apB[0], r.dsB[0]), y0 = Math.min(r.apB[1], r.dsB[1]), x1 = Math.max(r.apB[2], r.dsB[2]), y1 = Math.max(r.apB[3], r.dsB[3]);
      if (r.C <= cMax && (x1 < 0 || (x1 - x0 + 1 <= wMax && y1 - y0 + 1 <= hMax))) return false;
      return true;
    }
    C.step = function (t) {
      var sig;
      try { sig = readSig(sctx, G, video, null); } catch (e) { C.bad = true; return; }
      C.samples++; if (sig.blank) C.blanks++;
      learnMoving(sig, t);
      var kept = C.kept, mask = C.mask, pctx = C.pctx;
      if (!dedup) {
        if (sig.blank) return;
        var sc0 = { t: t, ts: t, sig: sig, blobP: snap() };
        C.scenes.push(sc0); kept.push({ sig: sig, scene: sc0 }); if (kept.length > 12) kept.shift();
        return;
      }
      var last = kept.length ? kept[kept.length - 1] : null;
      if (last && !isNewScene(analyzeX(last.sig, sig, G, mask, pctx), minPx, pctx)) { C.pending = null; return; }
      // a new screen counts once it holds still for two looks in a row (the second look comes 0.25 s after the first);
      // while it keeps changing (scrolling, an animation) it is followed, and photographed after 5 s at the latest
      if (!C.pending) { C.pending = { sig: sig, t: t, n: 0, at: t }; return; }
      if (stillMoving(C.pending.sig, sig) && t - C.pending.t < settle) { C.pending.sig = sig; C.pending.n++; C.pending.at = t; return; }
      if (t - C.pending.at < HOLD && t - C.pending.t < settle) return;
      var t0 = t - C.pending.t > 1.5 ? t : C.pending.t; C.pending = null;
      commit(sig, t0, null, t);
    };
    // ts: the moment in the video of the look that is kept (where the photo is taken, now or later)
    function commit(sig, t0, blobP, ts) {
      var kept = C.kept, mask = C.mask, pctx = C.pctx, last = kept.length ? kept[kept.length - 1] : null;
      for (var hh = kept.length - 1; hh >= 0 && hh >= kept.length - 12; hh--) {
        if (!isNewScene(analyzeX(kept[hh].sig, sig, G, mask, pctx), minPx, pctx)) return;
      }
      if (sig.blank) return;
      blobP = blobP || snap();
      if (doMerge && last && isAdditive(analyzeX(last.sig, sig, G, mask, pctx), pctx)) {
        last.scene.blobP = blobP; last.scene.sig = sig; last.scene.ts = ts; last.sig = sig;
      } else {
        var sc = { t: t0, ts: ts, sig: sig, blobP: blobP };
        C.scenes.push(sc); kept.push({ sig: sig, scene: sc }); if (kept.length > 12) kept.shift();
      }
    }
    // is F just a frame from a cross-fade between A and B? Where A and B differ, a fade frame sits in between
    // (neither like A nor like B); a real screen of its own matches one of them there, or shows something else.
    function isBlend(A, F, B) {
      var n = Math.min(A.length, F.length, B.length), diff = 0, mid = 0, i, a, b, f, lo, hi;
      for (i = 0; i < n; i++) {
        a = A[i]; b = B[i]; if (Math.abs(a - b) <= 24) continue;
        diff++; f = F[i]; lo = a < b ? a : b; hi = a < b ? b : a;
        if (Math.abs(f - a) > 12 && Math.abs(f - b) > 12 && f >= lo - 6 && f <= hi + 6) mid++;
      }
      return diff > 40 && mid > 0.33 * diff;
    }
    return C;
  }

  // plays [start, end) as fast as possible while never skipping more than GAP seconds of video:
  // if the browser skipped frames, go back to the last look and lower this player's speed cap.
  function playPart(P, start, end, C) {
    var v = P.video, mp = P.mp, A = api(mp), rate = P.cont && P.carry ? P.carry.rate : YT_RATE, cap = P.cont && P.carry ? P.carry.cap : MAX_RATE, lastT = -1, lastProgressAt = Date.now(), lastGapAt = Date.now(), done = false, rewinding = false;
    // first look over the opening seconds of this part only to learn what keeps moving, then start over and capture
    var warming = (prefs.ignoreMoving !== false || prefs.ignoreCaptions !== false) && P.warm !== false, warmEnd = Math.min(end, start + 4), warmLast = -1;
    var EVERY = Math.max(0.1, Number(prefs.every) || 1), TOL = Math.max(0.15, EVERY * 1.5), PTOL = Math.min(GAP, TOL), NEXT = Math.min(SAMPLE, EVERY);
    P.pos = start; P.rate = rate; P.gaps = 0; P.end = end; P.mt = 0; P.ads = P.ads || 0;
    function seek(t) { try { if (A.seekTo) A.seekTo(t, true); else v.currentTime = t; } catch (e) { try { v.currentTime = t; } catch (e2) {} } }
    function play() {
      try { if (A.playVideo) A.playVideo(); } catch (e) {}
      try { var pp = v.play(); if (pp && pp.catch) pp.catch(function (err) { P.playErr = (err && err.name) || "error"; }); } catch (e) {}
    }
    function setRate(r) {
      try { if (A.setPlaybackRate) A.setPlaybackRate(Math.min(r, YT_RATE)); } catch (e) {}
      if (Math.abs(v.playbackRate - r) > 0.01) { try { v.playbackRate = r; } catch (e) {} }
    }
    function atEnd(t) { return t >= P.end - 0.3 || (v.duration && t >= v.duration - 0.6); }
    var JUMP = EVERY >= 2, burst = 0, burstAt = start + 10;
    if (JUMP && !warming) return jumpPart(P, start, C, EVERY);
    // carrying on right where the last piece ended: no jump (the video ahead is already loaded)
    var here = 0; try { here = v.currentTime; } catch (e) {}
    if (!(P.cont && !warming && here >= start - 0.5 && here <= start + 3)) seek(start);
    play();
    return new Promise(function (resolve) {
      function finish() { if (done) return; done = true; clearInterval(guard); P.carryOut = { rate: Math.max(YT_RATE, rate), cap: cap }; try { v.pause(); } catch (e) {} resolve(); }
      function again() { if (!done) { try { v.requestVideoFrameCallback(onFrame); } catch (e) {} } }
      function onFrame(now, meta) {
        if (done) return;
        if (stopReq || C.bad) return finish();
        if (isAd(mp)) { trySkipAd(P.doc); return again(); }
        var t = meta && typeof meta.mediaTime === "number" ? meta.mediaTime : v.currentTime;
        if (warming) {
          if (t < start - 2 || t > warmEnd + 3) return again();
          if (t - warmLast >= SAMPLE) { warmLast = t; C.learn(t); lastProgressAt = Date.now(); P.mt = Math.max(P.mt, t); }
          if (t >= warmEnd - 0.05) {
            warming = false; C.prevSig = null;
            if (JUMP) { done = true; clearInterval(guard); jumpPart(P, start, C, EVERY).then(resolve); return; }
            seek(start);
          }
          return again();
        }
        if (lastT < 0) {
          if (t < start - 2 || t > start + 3) return again();            // the first jump hasn't landed yet
        } else if (rewinding) {
          if (Math.abs(t - lastT) > TOL) return again();                 // still showing frames from before the rewind
          rewinding = false;
        } else if (t > lastT + (C.pending || burst > 0 ? PTOL : TOL) && cap > 1) {
          cap = Math.max(1, cap * 0.75); rate = Math.min(rate, cap); lastGapAt = Date.now(); P.gaps++;
          setRate(rate);
          rewinding = true; seek(lastT); return again();
        } else if (t < lastT - 1) return again();
        if (EVERY > SAMPLE && t >= burstAt) { burst = 5; burstAt = t + 10; }
        if (lastT < 0 || t - lastT >= (burst > 0 ? SAMPLE : C.pending ? NEXT : EVERY) - 0.005) {
          if (burst > 0) burst--; lastT = t; lastProgressAt = Date.now(); C.step(t); P.mt = Math.max(P.mt, t);
          // a new screen showed up: slow down until it is confirmed, so the second look comes a quarter second later
          // (at high speed the browser skips frames and a short slide could be gone by then)
          var want = C.pending ? Math.min(rate, YT_RATE) : rate;
          if (Math.abs(v.playbackRate - want) > 0.01) setRate(want);
        }
        P.pos = Math.max(P.pos, Math.min(lastT, P.end));
        if (atEnd(t)) return finish();
        again();
      }
      var guard = setInterval(function () {
        if (done) return;
        if (stopReq || C.bad) return finish();
        dismissStillWatching(P.doc);
        if (isAd(mp)) { trySkipAd(P.doc); lastProgressAt = Date.now(); P.ads++; P.diag = "광고"; return; }
        if (lastT >= 0 && atEnd(lastT)) return finish();
        var st = -9; try { st = A.getPlayerState(); } catch (e) {}
        // the player stopped early (ended, paused) or got stuck: pick up where it left off
        if (v.ended || st === 0) {
          if (v.duration && lastT >= v.duration - 1.5) return finish();
          rewinding = lastT >= 0; seek(Math.max(start, lastT)); play(); again();
        } else if (v.paused) { play(); }
        if (Date.now() - lastProgressAt > 12000) { lastProgressAt = Date.now(); rewinding = lastT >= 0; seek(Math.max(start, lastT)); play(); again(); }
        // speed: as fast as the connection feeds it, never above the cap learned from skipped frames
        var ahead = bufferedAhead(v);
        // YouTube sends video at the speed its own player is set to (top: 2x). Go above it only while plenty is already loaded.
        if (v.readyState < 3 || ahead < 1) rate = Math.max(1, Math.min(rate, YT_RATE) * 0.75);
        else if (ahead > (EVERY >= 1 ? 10 : 20)) rate = Math.min(cap, rate * 1.25);
        else if (ahead > 4) rate = Math.min(cap, Math.max(rate, Math.min(YT_RATE, rate * 1.25)));
        else if (rate > YT_RATE) rate = YT_RATE;
        if (Date.now() - lastGapAt > 15000 && cap < MAX_RATE) { cap = Math.min(MAX_RATE, cap * 1.2); lastGapAt = Date.now(); }
        setRate(C.pending ? Math.min(rate, YT_RATE) : rate);
        P.rate = v.paused || v.readyState < 3 ? 0 : rate; P.ahead = ahead;
        P.err = v.readyState < 3 ? (playerError(P.doc) || "") : "";
        P.diag = P.err ? "유튜브 오류" : v.paused ? "멈춤" + (P.playErr ? "(" + P.playErr + ")" : "") : v.readyState < 3 ? "로딩" : warming ? "준비" : "";
      }, 1000);
      setRate(rate);
      again();
    });
  }

  // Put the paused video at one moment and wait until its picture is really up.
  function showMoment(v, A, t) {
    return new Promise(function (res) {
      var fin = false, to = null;
      function done(ok) { if (fin) return; fin = true; v.removeEventListener("seeked", onSeeked); clearTimeout(to); res(ok); }
      function onSeeked() {
        var waited = 0;
        (function check() {
          if (fin) return;
          if (v.readyState >= 2 && !v.seeking) {
            var vf = false;
            try { v.requestVideoFrameCallback(function () { vf = true; done(true); }); } catch (e) {}
            setTimeout(function () { if (!vf) done(true); }, 120);
            return;
          }
          if ((waited += 100) > 12000) return done(false);
          setTimeout(check, 100);
        })();
      }
      v.addEventListener("seeked", onSeeked);
      to = setTimeout(function () { done(v.readyState >= 2 && Math.abs(v.currentTime - t) < 0.6); }, 15000);
      try { if (A.seekTo) A.seekTo(t, true); else v.currentTime = t; } catch (e) { try { v.currentTime = t; } catch (e2) { done(false); } }
      try { if (!v.paused) v.pause(); } catch (e) {}
    });
  }

  // Looking every few seconds anyway, there is no need to play the video in between: jump straight to each moment.
  // A paused YouTube player keeps loading ahead as fast as the connection allows, so this is not held to 2x.
  function jumpPart(P, start, C, every) {
    var v = P.video, A = api(P.mp), began = Date.now(), burst = 0, burstAt = start + 40;
    try { if (A.pauseVideo) A.pauseVideo(); } catch (e) {}
    try { v.pause(); } catch (e) {}
    function goTo(t) { return showMoment(v, A, t); }
    return (async function () {
      var t = start, fails = 0, grid = start;
      C.prevSig = null;
      while (!stopReq && !C.bad) {
        if (t >= P.end - 0.05 || (v.duration && t > v.duration - 0.3)) break;
        if (isAd(P.mp)) { trySkipAd(P.doc); P.ads++; P.diag = "광고"; try { v.play(); } catch (e) {} await sleep(500); continue; }
        dismissStillWatching(P.doc);
        var ok = await goTo(t);
        if (!ok && v.duration && t > v.duration - 3) break;   // the very end (end screen, rounding of the length): done
        if (!ok) { P.err = playerError(P.doc) || ""; P.diag = P.err ? "유튜브 오류" : "로딩"; if (++fails >= 4) { fails = 0; t += 0.25; } continue; }   // keeps failing at one spot: nudge past it
        P.err = "";
        fails = 0;
        if (!v.paused) { try { v.pause(); } catch (e) {} }
        C.step(t);
        P.mt = Math.max(P.mt, t); P.pos = Math.max(P.pos, Math.min(t, P.end)); P.diag = "";
        P.rate = (P.pos - start) / Math.max(0.5, (Date.now() - began) / 1000);
        if (t >= burstAt) { burst = 4; burstAt = t + 40; }
        // The regular looks stay on their beat (start, +every, +2 every, ...). A look that found something new gets a second
        // look a quarter second later (then every half second while the screen keeps moving): those are extra and do not
        // push the beat back, so no stretch of video longer than the chosen interval goes unseen.
        if (burst > 0) { burst--; t += 0.25; }
        else if (C.pending) t += C.pending.n ? 0.5 : 0.25;
        else { while (grid <= t + 0.01) grid += every; t = grid; }
      }
    })();
  }

  // all parts' scenes in time order, repeats across part borders removed
  function finalPass(G, parts) {
    if (prefs.dedup === false) {
      var every = [], lastT = -1e9;
      parts.forEach(function (C) { C.scenes.forEach(function (sc) { every.push(sc); }); });
      every.sort(function (a, b) { return a.t - b.t; });
      return every.filter(function (sc) { if (sc.t - lastT < Math.max(0.05, (prefs.every || 1) * 0.5)) return false; lastT = sc.t; return true; }).map(function (sc) { return { t: sc.t, blobP: sc.blobP }; });
    }
    // two scenes are compared ignoring only what was moving around either of them (not everything that ever moved)
    var pair = {}, most = new Uint8Array(G.nb), votes = new Uint16Array(G.nb);
    parts.forEach(function (C) { for (var b = 0; b < G.nb; b++) if (C.mask[b]) votes[b]++; });
    for (var vb = 0; vb < G.nb; vb++) if (parts.length >= 2 && votes[vb] * 2 >= parts.length) most[vb] = 1;
    function maskOf(x, y) {
      var lo = Math.min(x.pi, y.pi), hi = Math.max(x.pi, y.pi), key = lo + "_" + hi;
      if (!pair[key]) { var m = new Uint8Array(G.nb), ma = parts[lo].mask, mb = parts[hi].mask; for (var b = 0; b < G.nb; b++) if (ma[b] || mb[b] || most[b]) m[b] = 1; pair[key] = m; }
      return pair[key];
    }
    // a part's opening scene repeats what the previous part already saw (parts overlap by a second): mark it
    var all = [];
    parts.forEach(function (C, k) {
      var from = typeof C.start === "number" ? C.start : 0;
      C.scenes.forEach(function (sc) { sc.pi = k; sc.border = k > 0 && sc.t < from + 1.5; all.push(sc); });
    });
    all.sort(function (a, b) { return a.t - b.t; });
    // reuse the mouse-pointer size the parts learned, so a pointer that moved is not taken for a new scene at part borders
    var best = null;
    var bestT = null;
    parts.forEach(function (C) { var q = C.pctx && C.pctx.ptr; if (q && (!best || q.seen > best.seen)) best = q; var tq = C.pctx && C.pctx.tpl; if (tq && (!bestT || tq.seen > bestT.seen)) bestT = tq; });
    var out = [], kept = [], pctx = { ptr: best ? Object.assign({}, best) : null, tpl: bestT }, minPx = prefs.minPx;
    all.forEach(function (sc) {
      var last = kept.length ? kept[kept.length - 1] : null;
      if (sc.border && last) {
        // same moment seen twice: keep the fuller picture if something was added, otherwise drop the repeat
        var rb = analyzeX(last.sig, sc.sig, G, maskOf(last, sc), pctx);
        if (prefs.merge && isAdditive(rb, pctx)) { last.out.blobP = sc.blobP; last.out.ts = sc.ts; last.out.sig = sc.sig; last.sig = sc.sig; last.pi = sc.pi; return; }
        if (!isNewScene(rb, minPx * 1.5, pctx)) return;
      }
      for (var i = kept.length - 1; i >= 0 && i >= kept.length - 12; i--) {
        if (!isNewScene(analyzeX(kept[i].sig, sc.sig, G, maskOf(kept[i], sc), pctx), minPx, pctx)) return;
      }
      if (prefs.merge && last && isAdditive(analyzeX(last.sig, sc.sig, G, maskOf(last, sc), pctx), pctx)) { last.out.blobP = sc.blobP; last.out.ts = sc.ts; last.out.sig = sc.sig; last.sig = sc.sig; last.pi = sc.pi; return; }
      var o = { t: sc.t, ts: sc.ts, sig: sc.sig, blobP: sc.blobP };
      out.push(o); kept.push({ sig: sc.sig, out: o, pi: sc.pi }); if (kept.length > 12) kept.shift();
    });
    return out;
  }

  // Firefox add-ons must copy a picture out of the frame that sent it; elsewhere the picture stays as it is
  // (a copy would sit in this page's memory, and a phone has little of that)
  var DBG = false; try { DBG = !!localStorage.getItem("lcDebug"); } catch (e) {}
  var IS_FF = /Firefox\//i.test(navigator.userAgent || "");
  function copyPic(b) { return IS_FF ? new Response(b).arrayBuffer().catch(function () { return b; }) : Promise.resolve(b); }

  // Finished pieces are also written to this site's storage on the device, so a job survives the tab being closed,
  // reloaded, or thrown out of memory by the phone while another app is in front.
  var dbP = null;
  function db() {
    return dbP || (dbP = new Promise(function (res) {
      try {
        var rq = indexedDB.open("lecture-capture", 1);
        rq.onupgradeneeded = function () { rq.result.createObjectStore("kv"); };
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = rq.onblocked = function () { res(null); };
      } catch (e) { res(null); }
    }));
  }
  function dbDo(mode, fn) {
    return db().then(function (d) {
      if (!d) return null;
      return new Promise(function (res) {
        try {
          var tx = d.transaction("kv", mode), rq = fn(tx.objectStore("kv"));
          tx.oncomplete = function () { res(rq && rq.result !== undefined ? rq.result : null); };
          tx.onerror = tx.onabort = function () { if (DBG) console.log("[lc] db " + mode + " failed: " + (tx.error && tx.error.message)); res(null); };
        } catch (e) { if (DBG) console.log("[lc] db " + mode + " threw: " + e.message); res(null); }
      });
    }).catch(function () { return null; });
  }
  function dbPut(k, v) { return dbDo("readwrite", function (st) { return st.put(v, k); }); }
  function dbGet(k) { return dbDo("readonly", function (st) { return st.get(k); }); }
  function dbDel(k) { return dbDo("readwrite", function (st) { return st.delete(k); }); }
  function dbRange(prefix) { return IDBKeyRange.bound(prefix, prefix + "\uffff"); }
  function dbAll(prefix) { return dbDo("readonly", function (st) { return st.getAll(dbRange(prefix)); }); }
  function dbDelAll(prefix) { return dbDo("readwrite", function (st) { return st.delete(dbRange(prefix)); }); }
  // what a saved piece was made with: only pieces made with the same settings can be reused
  function prefKey() { return [prefs.dedup !== false ? "2p" : prefs.quality, prefs.minPx, prefs.ignoreMoving !== false, prefs.ignoreCaptions !== false, prefs.merge !== false, prefs.every || 1, prefs.dedup !== false].join("|"); }

  // ---------- the video's words (its captions, or what is heard) ----------
  // YouTube no longer hands caption files to anyone who asks: the player adds a token of its own. So the player is asked
  // to show the captions, and the file it fetches for that is read on the way in. Asking directly is only the fallback.
  var ttHooked = false, ttSeen = [];
  function bodyText(x) {
    try {
      if (x.responseType === "" || x.responseType === "text") return x.responseText;
      if (x.responseType === "json") return JSON.stringify(x.response);
      if (x.responseType === "arraybuffer") return new TextDecoder().decode(x.response);
    } catch (e) {}
    return "";
  }
  function hookTimedtext() {
    if (ttHooked) return; ttHooked = true;
    try {
      var XO = XMLHttpRequest.prototype.open, XS = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function (m, u) { try { this.__lcu = String(u || ""); } catch (e) {} return XO.apply(this, arguments); };
      XMLHttpRequest.prototype.send = function () {
        var x = this;
        if (/\/api\/timedtext/.test(x.__lcu || "")) x.addEventListener("load", function () { var b = bodyText(x); if (b) ttSeen.push({ url: x.__lcu, body: b }); });
        return XS.apply(this, arguments);
      };
    } catch (e) {}
    try {
      var F = window.fetch;
      if (F) window.fetch = function (input) {
        var u = ""; try { u = typeof input === "string" ? input : (input && input.url) || String(input || ""); } catch (e) {}
        var pr = F.apply(this, arguments);
        if (/\/api\/timedtext/.test(u)) pr.then(function (r) { r.clone().text().then(function (t) { if (t) ttSeen.push({ url: u, body: t }); }, function () {}); }, function () {});
        return pr;
      };
    } catch (e) {}
  }
  function captionTracks(mp) {
    var A = api(mp), list = [];
    function nm(n) { return n ? n.simpleText || (n.runs || []).map(function (r) { return r.text; }).join("") : ""; }
    try {
      var pr = A.getPlayerResponse && A.getPlayerResponse(), r = pr && pr.captions && pr.captions.playerCaptionsTracklistRenderer;
      (r && r.captionTracks || []).forEach(function (c) { list.push({ lang: c.languageCode, kind: c.kind || "", name: nm(c.name) || c.languageCode, url: c.baseUrl || "" }); });
    } catch (e) {}
    if (!list.length) {
      try { (A.getOption && A.getOption("captions", "tracklist") || []).forEach(function (c) { list.push({ lang: c.languageCode, kind: c.kind || "", name: c.displayName || c.languageName || c.languageCode, url: "" }); }); } catch (e) {}
    }
    return list;
  }
  // captions someone wrote come before automatic ones; Korean before anything else
  function pickTrack(list) {
    function score(c) { return (c.kind === "asr" ? 0 : 2) + (/^ko/i.test(c.lang) ? 4 : 0); }
    return list.slice().sort(function (a, b) { return score(b) - score(a); })[0];
  }
  function seenFor(tr, from) {
    for (var i = ttSeen.length - 1; i >= (from || 0); i--) {
      var u = ttSeen[i].url;
      if (/[?&]tlang=/.test(u)) continue;
      var lang = (/[?&]lang=([^&]+)/.exec(u) || [])[1], asr = /[?&]kind=asr/.test(u);
      if ((!lang || decodeURIComponent(lang) === tr.lang) && asr === (tr.kind === "asr")) return ttSeen[i];
    }
    return null;
  }
  function unent(t) {
    return t.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(+n); });
  }
  // json3 (events with text pieces) or the older XML forms: [{ t: seconds, text }]
  function parseTimedtext(body) {
    var out = [];
    try {
      var j = JSON.parse(body);
      (j.events || []).forEach(function (ev) {
        if (!ev.segs) return;
        var t = ev.segs.map(function (sg) { return sg.utf8 || ""; }).join("").replace(/\s+/g, " ").trim();
        if (t) out.push({ t: (ev.tStartMs || 0) / 1000, d: (ev.dDurationMs || 0) / 1000, text: t });
      });
      return out;
    } catch (e) {}
    var re = /<text[^>]*start="([\d.]+)"[^>]*?(?:dur="([\d.]+)")?[^>]*>([\s\S]*?)<\/text>/g, m;
    while ((m = re.exec(body))) { var t1 = unent(m[3]).replace(/\s+/g, " ").trim(); if (t1) out.push({ t: +m[1], d: +(m[2] || 0), text: t1 }); }
    if (!out.length) {
      var re2 = /<p[^>]*\bt="(\d+)"[^>]*?(?:\bd="(\d+)")?[^>]*>([\s\S]*?)<\/p>/g;
      while ((m = re2.exec(body))) { var t2 = unent(m[3]).replace(/\s+/g, " ").trim(); if (t2) out.push({ t: +m[1] / 1000, d: +(m[2] || 0) / 1000, text: t2 }); }
    }
    return out;
  }
  // automatic captions come in scraps of a few words: join them into lines of a sentence or so
  function joinLines(segs) {
    var out = [], cur = null;
    segs.forEach(function (sg) {
      if (cur && (sg.t - cur.t > 12 || cur.text.length > 90 || sg.t - cur.end > 1.5 || /[.?!。]$/.test(cur.text))) { out.push(cur); cur = null; }
      if (!cur) cur = { t: sg.t, end: sg.t + (sg.d || 0), text: sg.text };
      else { cur.text += " " + sg.text; cur.end = Math.max(cur.end, sg.t + (sg.d || 0)); }
    });
    if (cur) out.push(cur);
    return out.map(function (x) { return { t: Math.round(x.t * 10) / 10, text: x.text }; });
  }
  async function getTranscript(mp) {
    hookTimedtext();
    var A = api(mp);
    try { if (A.loadModule) A.loadModule("captions"); } catch (e) {}
    var list = [];
    for (var i = 0; i < 24 && !list.length; i++) { list = captionTracks(mp); if (!list.length) await sleep(250); }
    if (!list.length) return { ok: false, why: "none" };
    var tr = pickTrack(list), got = seenFor(tr, 0), from = ttSeen.length;
    if (!got) {
      try { A.setOption("captions", "track", tr.kind ? { languageCode: tr.lang, kind: tr.kind } : { languageCode: tr.lang }); } catch (e) {}
      for (var k = 0; k < 48 && !got; k++) { await sleep(250); got = seenFor(tr, from); }
    }
    if (!got && tr.url) {
      try { var r = await fetch(tr.url + (/fmt=/.test(tr.url) ? "" : "&fmt=json3"), { credentials: "include" }); var b = await r.text(); if (b && b.length > 30) got = { url: tr.url, body: b }; } catch (e) {}
    }
    try { if (A.unloadModule) A.unloadModule("captions"); } catch (e) {}
    if (!got) return { ok: false, why: "blocked", tracks: list.length };
    var segs = parseTimedtext(got.body);
    if (!segs.length) return { ok: false, why: "empty" };
    return { ok: true, source: tr.kind === "asr" ? "자동 생성 자막" : "자막", lang: tr.lang, name: tr.name, segs: tr.kind === "asr" ? joinLines(segs) : segs.map(function (x) { return { t: Math.round(x.t * 10) / 10, text: x.text }; }) };
  }

  // ---------- the transcript, read on a YouTube watch page (richer than an embedded player) ----------
  // Three ways, best first:
  //  1) the "Show transcript" data YouTube's own page asks for (youtubei/v1/get_transcript, same site, no token needed);
  //  2) the transcript panel itself, read from the page (computer layout);
  //  3) the caption list YouTube's Android app gets, then the track itself;
  //  4) the player's captions (getTranscript above).
  function findDeep(o, key, depth) {
    if (!o || typeof o !== "object" || depth > 40) return null;
    if (Object.prototype.hasOwnProperty.call(o, key)) return o[key];
    for (var k in o) { var r = findDeep(o[k], key, depth + 1); if (r) return r; }
    return null;
  }
  function collectSegments(o, out, depth) {
    if (!o || typeof o !== "object" || depth > 60) return out;
    var r = o.transcriptSegmentRenderer;
    if (r && r.startMs != null) {
      var txt = r.snippet ? (r.snippet.simpleText || (r.snippet.runs || []).map(function (x) { return x.text; }).join("")) : "";
      txt = String(txt || "").replace(/\s+/g, " ").trim();
      if (txt) out.push({ t: Math.round(Number(r.startMs) / 100) / 10, d: r.endMs != null ? Math.max(0, (Number(r.endMs) - Number(r.startMs)) / 1000) : 0, text: txt });
      return out;
    }
    for (var k in o) collectSegments(o[k], out, depth + 1);
    return out;
  }
  function pageWin() { try { return window.wrappedJSObject || window; } catch (e) { return window; } }
  function ytcfgGet(k) { try { var y = pageWin().ytcfg; return y && y.get ? y.get(k) : (y && y.data_ ? y.data_[k] : null); } catch (e) { return null; } }
  function unx(s) { return String(s).replace(/\\x([0-9a-fA-F]{2})/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); }); }
  async function transcriptParams(id) {
    // the page as it is now (if it shows this video), else the watch page fetched afresh (YouTube changes pages without reloading)
    // (the page's own data only if it really is this video: YouTube keeps the first page's data after moving on)
    try { var D = pageWin().ytInitialData, cur = D && findDeep(D, "currentVideoEndpoint", 0);
      if (cur && cur.watchEndpoint && cur.watchEndpoint.videoId === id) { var p0 = findDeep(D, "getTranscriptEndpoint", 0); if (p0 && p0.params) return p0.params; } } catch (e) {}
    try {
      var html = unx(await (await fetch("/watch?v=" + id, { credentials: "include" })).text());   // the phone page writes its data with \x22-style escapes
      var m = /"getTranscriptEndpoint"\s*:\s*\{\s*"params"\s*:\s*"([^"]+)"/.exec(html);
      if (m) return m[1];
    } catch (e) {}
    return null;
  }
  // automatic captions come in scraps of a few words: join them into readable lines; real sentences stay as they are
  function tidySegs(segs) {
    var avg = segs.reduce(function (a, x) { return a + x.text.length; }, 0) / Math.max(1, segs.length);
    return avg < 20 ? joinLines(segs) : segs.map(function (x) { return { t: x.t, text: x.text }; });
  }
  async function transcriptFromApi(id) {
    var params = await transcriptParams(id), ctx = ytcfgGet("INNERTUBE_CONTEXT");
    if (!params) return { ok: false, why: "자막 없음(스크립트 버튼 없음)" };
    if (!ctx) return { ok: false, why: "페이지 정보 없음" };
    var key = ytcfgGet("INNERTUBE_API_KEY"), url = "/youtubei/v1/get_transcript?prettyPrint=false" + (key ? "&key=" + encodeURIComponent(key) : "");
    var hd = { "Content-Type": "application/json" }, cn = ytcfgGet("INNERTUBE_CONTEXT_CLIENT_NAME"), cv = ytcfgGet("INNERTUBE_CONTEXT_CLIENT_VERSION");
    if (cn) hd["X-Youtube-Client-Name"] = String(cn); if (cv) hd["X-Youtube-Client-Version"] = String(cv);
    var r = await fetch(url, { method: "POST", credentials: "include", headers: hd, body: JSON.stringify({ context: ctx, params: params }) });
    if (!r.ok) return { ok: false, why: "스크립트 요청 실패(" + r.status + ")" };
    var segs = collectSegments(await r.json(), [], 0);
    if (!segs.length) return { ok: false, why: "스크립트가 비어 있음" };
    return { ok: true, source: "유튜브 스크립트", lang: "", name: "스크립트 표시", segs: tidySegs(segs) };
  }
  // the transcript panel, read like a person would (computer layout only)
  async function transcriptFromPanel(id) {
    if (parseId(location.href) !== id) return { ok: false, why: "다른 영상" };
    function rows() {
      var out = [];
      document.querySelectorAll("ytd-transcript-segment-renderer, transcript-segment-view-model, ytm-transcript-segment-renderer").forEach(function (n) {
        var ts = n.querySelector(".segment-timestamp, .ytwTranscriptSegmentViewModelTimestamp, [class*=imestamp]"), tx = n.querySelector(".segment-text, span[role=text], yt-formatted-string:not([class*=imestamp])");
        var t = ts ? ts.textContent.trim() : "", m = /(\d+):(\d{2})(?::(\d{2}))?/.exec(t);
        if (!m || !tx) return;
        var sec = m[3] != null ? +m[1] * 3600 + +m[2] * 60 + +m[3] : +m[1] * 60 + +m[2];
        var text = tx.textContent.replace(/\s+/g, " ").trim(); if (text) out.push({ t: sec, text: text });
      });
      return out;
    }
    var got = rows();
    if (!got.length) {
      var btn = document.querySelector("ytd-video-description-transcript-section-renderer button, button[aria-label*='스크립트'], button[aria-label*='ranscript']");
      if (!btn) { var more = document.querySelector("tp-yt-paper-button#expand, #description-inline-expander #expand"); if (more) { more.click(); await sleep(600); btn = document.querySelector("ytd-video-description-transcript-section-renderer button, button[aria-label*='스크립트'], button[aria-label*='ranscript']"); } }
      if (!btn) return { ok: false, why: "스크립트 버튼 없음" };
      btn.click();
      for (var i = 0; i < 40 && !got.length; i++) { await sleep(250); got = rows(); }
      await sleep(500); got = rows();
      try { var cl = document.querySelector("ytd-engagement-panel-section-list-renderer[target-id*=transcript] #visibility-button button, ytd-engagement-panel-title-header-renderer #visibility-button button"); if (cl) cl.click(); } catch (e) {}
    }
    return got.length ? { ok: true, source: "유튜브 스크립트", lang: "", name: "스크립트 패널", segs: tidySegs(got) } : { ok: false, why: "스크립트를 읽지 못함" };
  }
  async function transcriptFromAppList(id) {
    var r = await fetch("/youtubei/v1/player?prettyPrint=false", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context: { client: { clientName: "ANDROID", clientVersion: "20.10.38", hl: "ko" } }, videoId: id }) });
    if (!r.ok) return { ok: false, why: "자막 목록 실패(" + r.status + ")" };
    var j = await r.json(), list = [];
    var tl = j && j.captions && j.captions.playerCaptionsTracklistRenderer;
    (tl && tl.captionTracks || []).forEach(function (c) { var nm = c.name ? (c.name.simpleText || (c.name.runs || []).map(function (x) { return x.text; }).join("")) : ""; list.push({ lang: c.languageCode, kind: c.kind || "", name: nm || c.languageCode, url: c.baseUrl || "" }); });
    if (!list.length) return { ok: false, why: "자막 트랙 없음" };
    var tr = pickTrack(list); if (!tr.url) return { ok: false, why: "자막 주소 없음" };
    var u = tr.url.replace(/&fmt=[^&]*/, "") + "&fmt=json3";
    var b = await (await fetch(u.replace(/^https?:\/\/[^/]+/, ""), { credentials: "include" })).text();
    var segs = b && b.length > 30 ? parseTimedtext(b) : [];
    if (!segs.length) return { ok: false, why: "자막 내용 없음" };
    return { ok: true, source: tr.kind === "asr" ? "자동 생성 자막" : "자막", lang: tr.lang, name: tr.name, segs: tr.kind === "asr" ? joinLines(segs) : segs.map(function (x) { return { t: Math.round(x.t * 10) / 10, text: x.text }; }) };
  }
  async function watchTranscript(id) {
    var tried = [];
    try { var a = await transcriptFromApi(id); if (a.ok) return a; tried.push(a.why); } catch (e) { tried.push("스크립트 요청 오류"); }
    try { var b = await transcriptFromPanel(id); if (b.ok) return b; if (b.why !== "다른 영상") tried.push(b.why); } catch (e) { tried.push("패널 오류"); }
    try { var d = await transcriptFromAppList(id); if (d.ok) return d; tried.push(d.why); } catch (e) { tried.push("자막 목록 오류"); }
    try { var lw = transcriptFromLiveWikiPanel(id); if (lw.ok) return lw; } catch (e) {}
    try {
      var mp = document.getElementById("movie_player");
      if (mp && parseId(location.href) === id) { var c = await getTranscript(mp); if (c && c.ok) return c; tried.push(c && c.why === "none" ? "자막 트랙 없음" : "플레이어 자막 실패(" + (c && c.why) + ")"); }
    } catch (e) { tried.push("플레이어 오류"); }
    tried = tried.filter(function (x, i) { return x && tried.indexOf(x) === i; });
    // every way said "there are none": say it plainly
    if (tried.every(function (x) { return /없음/.test(x); })) return { ok: false, none: true, why: "이 영상엔 자막 없음" };
    return { ok: false, why: tried.join(", ") };
  }

  // "00:12" on a line of its own followed by the words, or "[00:12] words" / "00:12 words" on one line
  function parseTimed(text) {
    var out = [], pend = null, TIME = /^\s*\[?(\d{1,2}(?::\d{2}){1,2})\]?\s*$/, TIMED = /^\s*\[?(\d{1,2}(?::\d{2}){1,2})\]?\s*[-–:]?\s+(.+)$/;
    function sec(c) { return c.split(":").map(Number).reduce(function (a, b) { return a * 60 + b; }, 0); }
    String(text || "").replace(/\r/g, "").split("\n").forEach(function (ln) {
      var m;
      if ((m = TIME.exec(ln))) { pend = { t: sec(m[1]), text: "" }; out.push(pend); }
      else if ((m = TIMED.exec(ln))) { pend = null; out.push({ t: sec(m[1]), text: m[2].trim() }); }
      else if (ln.trim() && pend && pend.text.length < 400) pend.text += (pend.text ? " " : "") + ln.trim();
    });
    out = out.filter(function (x) { return x.text; });
    // a script runs forward in time: keep the longest stretch that does
    var best = [], cur = [];
    out.forEach(function (x) { if (cur.length && x.t < cur[cur.length - 1].t) { if (cur.length > best.length) best = cur; cur = []; } cur.push(x); });
    if (cur.length > best.length) best = cur;
    return best;
  }
  // the LiveWiki extension's panel on a YouTube page, if it is open and shows the script
  function transcriptFromLiveWikiPanel(id) {
    if (parseId(location.href) !== id) return { ok: false, why: "다른 영상" };
    var texts = [];
    document.querySelectorAll("[id*=livewiki i], [class*=livewiki i]").forEach(function (n) { try { texts.push(n.innerText || ""); if (n.shadowRoot) texts.push(n.shadowRoot.textContent || ""); } catch (e) {} });
    var best = [];
    texts.forEach(function (t) { var sg = parseTimed(t); if (sg.length > best.length) best = sg; });
    return best.length >= 10 ? { ok: true, source: "LiveWiki 스크립트", lang: "", name: "LiveWiki", segs: best } : { ok: false, why: "LiveWiki 없음" };
  }
  function clockT(sec) {
    sec = Math.max(0, Math.floor(sec)); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : String(m).padStart(2, "0")) + ":" + String(s).padStart(2, "0");
  }
  // the transcript as a plain text file anyone (or any AI) can read: a short header, then "[mm:ss] words" lines
  function transcriptText(meta, tr) {
    var head = ["제목: " + (meta.title || ""), "주소: " + watchUrl(meta.id), "길이: " + (meta.dur ? clockT(meta.dur) : "?"),
      "대본: " + (tr && tr.ok ? tr.source + (tr.name ? " (" + tr.name + ")" : "") : "없음"), "-----"];
    return head.concat(tr && tr.ok ? tr.segs.map(function (x) { return "[" + clockT(x.t) + "] " + x.text; }) : []).join("\n") + "\n";
  }
  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob), f = null;
    try {
      f = document.createElement("iframe"); f.style.display = "none"; document.body.appendChild(f);
      var fd = f.contentDocument, a = fd.createElement("a"); a.href = url; a.download = name; fd.body.appendChild(a); a.click();
      setTimeout(function () { f.remove(); }, 60000);
    } catch (e) {
      if (f) f.remove();
      var a2 = document.createElement("a"); a2.href = url; a2.download = name; document.body.appendChild(a2); a2.click(); a2.remove();
    }
  }

  // The companion script ('강의 캡처 연결') keeps packages for the note page (claude.ai) in its own storage, the one
  // place both sites can reach. It answers a ping on this page if it is installed.
  var bridgeP = null;
  function bridge() {
    if (bridgeP) return bridgeP;
    bridgeP = new Promise(function (res) {
      var got = false, n = 0;
      function on(e) { var d = e.data; if (e.source === window && d && d.lcb === 1 && d.dir === "out" && d.op === "hello") { got = true; window.removeEventListener("message", on); res(true); } }
      window.addEventListener("message", on);
      (function ping() { if (got) return; if (n++ > 12) { window.removeEventListener("message", on); return res(false); } try { window.postMessage({ lcb: 1, dir: "in", op: "ping" }, "*"); } catch (e) {} setTimeout(ping, 250); })();
    });
    return bridgeP;
  }
  var bridgeWhy = "";
  function bridgePut(item, blob) {
    return bridge().then(function (ok) {
      if (!ok) { bridgeWhy = "'강의 캡처 연결' 스크립트가 응답하지 않음"; return false; }
      if (!blob) { bridgeWhy = "보낼 자료 없음"; return false; }
      return new Promise(function (res) {
        var ref = Math.random().toString(36).slice(2), t = 0;
        function on(e) { var d = e.data; if (e.source === window && d && d.lcb === 1 && d.dir === "out" && d.ref === ref && (d.op === "put-ok" || d.op === "put-fail")) { window.removeEventListener("message", on); clearTimeout(t); if (d.op !== "put-ok") bridgeWhy = "저장 실패: " + (d.why || "?"); res(d.op === "put-ok"); } }
        window.addEventListener("message", on);
        try { window.postMessage({ lcb: 1, dir: "in", op: "put", ref: ref, item: item, blob: blob }, "*"); } catch (e) { window.removeEventListener("message", on); return res(false); }
        t = setTimeout(function () { window.removeEventListener("message", on); bridgeWhy = "저장이 3분 안에 끝나지 않음"; res(false); }, 180000);
      });
    });
  }
  // a lighter copy of a photo for the hand-over (at most 1280 wide, JPEG 75%)
  async function lighter(b) {
    try {
      var bmp = await createImageBitmap(b), s = Math.min(1, 1280 / bmp.width), c = document.createElement("canvas");
      c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s); c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height); try { bmp.close(); } catch (e) {}
      var o = await new Promise(function (r) { c.toBlob(r, "image/jpeg", 0.75); });
      return o && o.size < b.size ? o : b;
    } catch (e) { return b; }
  }
  async function saveZip(title, scenes, waitMs, extra) {
    var handOver = !!(extra && prefs.mode === "digest") && await bridge(), lite = handOver ? new JSZip() : null;
    if (extra && prefs.mode === "digest" && !handOver) bridgeWhy = "'강의 캡처 연결' 스크립트가 응답하지 않음";
    var zip = new JSZip();
    for (var i = 0; i < scenes.length; i++) {
      var b = await scenes[i].blobP;
      if (!b) continue;
      var data = b; try { data = await new Response(b).arrayBuffer(); } catch (e) {}
      var fname = String(i + 1).padStart(4, "0") + "_" + fmt(scenes[i].t) + ".jpg";
      zip.file(fname, data, { binary: true }); if (extra) (extra.photos = extra.photos || []).push({ file: fname, t: Math.round(scenes[i].t * 10) / 10 });
      if (lite) lite.file(fname, await lighter(new Blob([data], { type: "image/jpeg" })), { binary: true });
    }
    // for writing it up later (the 'video digest' page or a chat with Claude): the words and where each photo sits in time
    if (extra) {
      var tr = extra.subs && extra.subs.ok ? extra.subs : null;
      var ttxt = tr ? transcriptText(Object.assign({ title: title }, extra), tr) : null;
      var djson = JSON.stringify({ kind: "lecture-capture", version: 1, title: title, id: extra.id, url: watchUrl(extra.id), duration: extra.dur || 0,
        transcript: tr ? { source: tr.source, lang: tr.lang, name: tr.name, segs: tr.segs } : null, photos: extra.photos || [] });
      if (ttxt) zip.file("transcript.txt", ttxt);
      zip.file("digest-data.json", djson);
      if (lite) { if (ttxt) lite.file("transcript.txt", ttxt); lite.file("digest-data.json", djson); }
    }
    var blob = await zip.generateAsync({ type: "blob", compression: "STORE", streamFiles: true });
    // the download link is clicked inside a hidden frame: Firefox closes the work window when this page itself "navigates" to a download
    var url = URL.createObjectURL(blob), name = safeName(title) + (prefs.mode === "digest" ? "_정리자료.zip" : "_캡처.zip"), f = null;
    try {
      f = document.createElement("iframe"); f.style.display = "none"; document.body.appendChild(f);
      var fd = f.contentDocument, a = fd.createElement("a"); a.href = url; a.download = name; fd.body.appendChild(a); a.click();
      setTimeout(function () { f.remove(); }, 60000);
    } catch (e) {
      if (f) f.remove();
      var a2 = document.createElement("a"); a2.href = url; a2.download = name; document.body.appendChild(a2); a2.click(); a2.remove();
    }
    var handed = false;
    if (lite) {
      try { var lb = await lite.generateAsync({ type: "blob", compression: "STORE" });
        handed = await bridgePut({ kind: "zip", name: name, id: extra.id, title: title, words: !!(extra.subs && extra.subs.ok) }, lb); } catch (e) { handed = false; }
    }
    await sleep(waitMs == null ? 2500 : waitMs);
    return { handed: handed, why: handed ? "" : bridgeWhy };
  }

  // ---------- panel (shadow DOM, no innerHTML: YouTube enforces Trusted Types) ----------
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function opt(v, t) { return h("option", { value: v, text: t }); }
  var CSS = [
    ":host{all:initial}",
    ".p{--bg:#fff;--fg:#18202C;--mu:#5A6475;--ln:#D5DBE4;--ac:#2450B8;--ai:#fff;--bad:#B3261E;--ok:#1E7A4C;",
    "position:fixed;top:72px;right:16px;z-index:2147483000;width:320px;max-width:calc(100vw - 32px);font:13px/1.5 'Malgun Gothic','Apple SD Gothic Neo',system-ui,sans-serif;",
    "background:var(--bg);color:var(--fg);border:1px solid var(--ln);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.18)}",
    "@media (prefers-color-scheme:dark){.p{--bg:#19202B;--fg:#E6EAF1;--mu:#9AA4B5;--ln:#2B3443;--ac:#82A5F4;--ai:#0D1320;--bad:#F2877E;--ok:#5BC48D}}",
    ".h{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;font-weight:700;font-size:14px}",
    ".h span{flex:1}.h i{font-style:normal;color:var(--mu);font-weight:400}",
    ".b{display:flex;flex-direction:column;gap:8px;padding:0 12px 12px}",
    "textarea,select{font:inherit;color:var(--fg);background:var(--bg);border:1px solid var(--ln);border-radius:8px;padding:6px 8px;width:100%;box-sizing:border-box}",
    "textarea{font-family:Consolas,monospace;font-size:12px;resize:vertical}",
    ".r{display:flex;gap:8px;align-items:center}.r label{flex:1;display:flex;flex-direction:column;gap:2px;color:var(--mu);font-size:12px}",
    ".c{display:flex;gap:6px;align-items:flex-start;color:var(--fg)}.c input{margin:2px 0 0;accent-color:var(--ac)}",
    "button{font:inherit;font-weight:700;border-radius:8px;padding:8px 12px;cursor:pointer;border:1px solid var(--ac);background:var(--ac);color:var(--ai)}",
    "button.stop{background:var(--bad);border-color:var(--bad);color:#fff}button:disabled{opacity:.5;cursor:default}",
    ".st{color:var(--mu);font-size:12px;min-height:18px}.st b{color:var(--fg)}",
    ".res{margin:0;padding-left:16px;font-size:12px;color:var(--mu);max-height:320px;overflow:auto}.res .ok{color:var(--ok)}.res .bad{color:var(--bad)}.res .wait{color:var(--mu)}",
    ".note{font-size:11px;color:var(--mu);margin:0}",
    ".seg{display:flex;border:1px solid var(--ln);border-radius:8px;overflow:hidden}.seg label{flex:1;position:relative;text-align:center;cursor:pointer}",
    ".seg input{position:absolute;opacity:0}.seg span{display:block;padding:6px 4px;font-weight:700;color:var(--mu)}.seg input:checked+span{background:var(--ac);color:var(--ai)}.seg input:focus-visible+span{outline:2px solid var(--ac)}",
    "@media (max-width:700px){.p{top:auto;bottom:8px;left:8px;right:8px;width:auto;max-width:none;max-height:52vh;overflow:auto}.r{flex-wrap:wrap}.r label{min-width:140px}}"
  ].join("");
  // opens the digest page in a new tab (the ZIP is then picked there from the downloads folder)
  function digestLink(text) {
    var li = h("li", { style: "list-style:none;margin:10px 0 0 -16px" });
    var a = h("a", { href: DIGEST_URL, target: "_blank", rel: "noopener", text: "다음 단계: 정리 노트 만들기 →", style: "display:block;text-align:center;padding:10px;border-radius:8px;background:var(--ac);color:var(--ai);font-weight:700;text-decoration:none" });
    li.appendChild(a);
    li.appendChild(h("div", { text: "'강의 캡처 연결' 스크립트가 있으면 자료가 자동으로 넘어가고, 없으면 열린 페이지에서 '_정리자료.zip'을 고르면 돼요.", style: "font-size:11px;color:var(--mu);margin-top:4px" }));
    return li;
  }
  // opens LiveWiki for one video (its address goes along and is typed in there; it is also copied, just in case)
  function liveWikiButton(id) {
    var b = h("button", { text: "LiveWiki로 대본 받기", style: "display:block;margin:4px 0 2px;padding:4px 8px;font-size:11px;background:var(--bg);color:var(--ac)" });
    b.addEventListener("click", function () {
      try { navigator.clipboard.writeText(watchUrl(id)).catch(function () {}); } catch (e) {}
      window.open(LIVEWIKI_URL + "#lc-yt=" + id, "_blank");
      b.textContent = "LiveWiki 열림 · 거기서 요약하면 대본이 저장돼요";
    });
    return b;
  }
  function makePanel(noteText, digText) {
    var host = document.createElement("div"); host.id = "lecture-capture-panel";
    var root = host.attachShadow({ mode: "open" });
    var style = document.createElement("style"); style.textContent = CSS; root.appendChild(style);
    root.appendChild(h("div", { class: "p" }, [
      h("div", { class: "h", id: "hd" }, [h("span", { text: "강의 화면 캡처" }), h("i", { id: "mini" }), h("i", { id: "fold", text: "▾" })]),
      h("div", { class: "b", id: "bd" }, [
        h("div", { class: "seg", role: "radiogroup", "aria-label": "할 일" }, [
          h("label", {}, [h("input", { type: "radio", name: "lcmode", id: "modeCap", value: "capture" }), h("span", { text: "화면 캡처" })]),
          h("label", {}, [h("input", { type: "radio", name: "lcmode", id: "modeDig", value: "digest" }), h("span", { text: "영상 정리용 자료" })])
        ]),
        h("textarea", { id: "links", rows: "4", placeholder: "유튜브 링크를 한 줄에 하나씩" }),
        h("p", { class: "note", id: "digNote", text: "영상 정리: ① 여기서 대본(유튜브 스크립트)과 장면 사진을 모아 '제목_정리자료.zip'으로 저장 → ② 끝나면 나오는 '다음 단계' 버튼으로 정리 노트 페이지를 열고 그 ZIP을 고르면 Claude가 요약·구간 정리·주요 발언·개념도·관련 자료를 만들어요. 대본은 유튜브 영상 페이지의 패널에서 링크를 넣고 시작해야 가장 잘 받아져요." }),
        h("div", { class: "r capOnly" }, [
          h("label", {}, ["속도 (동시 재생 플레이어)", h("select", { id: "workers" }, [opt("0", "자동: 가장 빠르게 (추천)"), opt("2", "2개 고정 (약 4배속)"), opt("4", "4개 고정 (약 8배속)"), opt("8", "8개 고정 (약 16배속)"), opt("12", "12개 고정 (약 24배속)"), opt("16", "16개 고정 (약 32배속)")])]),
          h("label", {}, ["화질", h("select", { id: "quality" }, [opt("max", "최고 화질 (영상에 있는 가장 높은 것)"), opt("hd2160", "4K (2160p)"), opt("hd1440", "1440p"), opt("hd1080", "1080p (선명, 추천)"), opt("hd720", "720p (가벼움, 빠름)")])])
        ]),
        h("div", { class: "r capOnly" }, [
          h("label", {}, ["몇 초마다 확인", h("select", { id: "every" }, EVERY_OPTS.map(function (n) { return opt(String(n), n + "초" + (n === 0.1 ? " (가장 꼼꼼, 느림)" : n < 1 ? " (꼼꼼)" : n === 1 ? " (추천)" : n >= 5 ? " (아주 빠름)" : " (빠름)")); }))]),
          h("label", {}, ["변화 감지", h("select", { id: "sens" }, [opt("30", "높게: 단어 하나까지 (추천)"), opt("80", "보통"), opt("300", "낮게")])])
        ]),
        h("label", { class: "c capOnly" }, [h("input", { type: "checkbox", id: "dedup" }), h("span", { text: "같은 화면은 건너뛰기 (중복 제외)" })]),
        h("label", { class: "c capOnly" }, [h("input", { type: "checkbox", id: "moving" }), h("span", { text: "화면 구석의 발표자 얼굴(웹캠)은 무시" })]),
        h("label", { class: "c capOnly" }, [h("input", { type: "checkbox", id: "caps" }), h("span", { text: "자막이 바뀌어도 새로 찍기 (화면과 자막이 둘 다 같을 때만 건너뜀, 추천)" })]),
        h("label", { class: "c capOnly" }, [h("input", { type: "checkbox", id: "merge" }), h("span", { text: "내용이 덧붙기만 하면 완성된 한 장만 남기기" })]),
        h("label", { class: "c capOnly" }, [h("input", { type: "checkbox", id: "subs" }), h("span", { text: "대본(자막)도 ZIP에 함께 넣기" })]),
        h("button", { id: "go", text: "캡처 시작" }),
        h("div", { class: "st", id: "st" }),
        h("ol", { class: "res", id: "res" }),
        h("p", { class: "note", id: "pnote", text: noteText }),
        h("a", { href: DIGEST_URL, target: "_blank", rel: "noopener", text: "내 정리 노트 보기 →", style: "color:var(--ac);font-weight:700;text-decoration:none;font-size:12px" })
      ])
    ]));
    var $ = function (id) { return root.getElementById(id); };
    (function mount() { if (!host.isConnected && document.body) document.body.appendChild(host); setTimeout(mount, 2000); })();
    $("workers").value = String(prefs.workers); $("quality").value = prefs.quality; $("sens").value = String(prefs.minPx);
    $("moving").checked = !!prefs.ignoreMoving; $("merge").checked = !!prefs.merge; $("caps").checked = prefs.ignoreCaptions === false;
    $("every").value = String(prefs.every || 1); $("dedup").checked = prefs.dedup !== false; $("subs").checked = prefs.subs !== false;
    function applyMode() {
      var dig = prefs.mode === "digest";
      $("modeCap").checked = !dig; $("modeDig").checked = dig; $("digNote").style.display = dig ? "" : "none";
      $("pnote").textContent = dig && digText ? digText : noteText;
      root.querySelectorAll(".capOnly").forEach(function (n) { n.style.display = dig ? "none" : ""; });
      root.querySelectorAll(".digOnly").forEach(function (n) { n.style.display = dig ? "" : "none"; });
      var go = $("go"); if (go && !go.classList.contains("stop") && /캡처 시작|정리 자료 만들기/.test(go.textContent)) go.textContent = dig ? "정리 자료 만들기" : "캡처 시작";
    }
    ["modeCap", "modeDig"].forEach(function (id) { $(id).addEventListener("change", function () { if (userSet) return applyMode(); prefs.mode = $("modeDig").checked ? "digest" : "capture"; savePrefs(); applyMode(); }); });
    setTimeout(applyMode, 0);
    function setOpen(o) { prefs.open = o; $("bd").style.display = o ? "" : "none"; $("fold").textContent = o ? "▾" : "▸"; savePrefs(); }
    setOpen(prefs.open !== false);
    $("hd").addEventListener("click", function () { setOpen(!prefs.open); });
    ["workers", "quality", "sens", "moving", "caps", "merge", "every", "dedup", "subs"].forEach(function (id) {
      $(id).addEventListener("change", function () { readPrefs(); savePrefs(); });
    });
    function readPrefs() {
      prefs.workers = Number($("workers").value); prefs.quality = $("quality").value; prefs.minPx = Number($("sens").value);
      prefs.ignoreMoving = $("moving").checked; prefs.merge = $("merge").checked; prefs.ignoreCaptions = !$("caps").checked;
      prefs.every = fixEvery($("every").value); prefs.dedup = $("dedup").checked; prefs.subs = $("subs").checked;
    }
    return {
      $: $, readPrefs: readPrefs, applyMode: applyMode, root: root,
      status: function (bold, rest) {
        var st = $("st"); st.textContent = "";
        if (bold) st.appendChild(h("b", { text: bold }));
        if (rest && rest.trim()) st.appendChild(document.createTextNode((bold ? " " : "") + rest.trim()));
        $("mini").textContent = prefs.open ? "" : st.textContent.slice(0, 18);
      },
      results: function (list) {
        var ol = $("res"); ol.textContent = "";
        list.forEach(function (x) {
          var li = h("li", { class: x.cls, text: x.text }); ol.appendChild(li);
          if (x.lw) li.appendChild(liveWikiButton(x.lw));
        });
        if (prefs.mode === "digest" && list.some(function (x) { return x.cls === "ok"; })) ol.appendChild(digestLink("정리자료 ZIP을 넣어 영상 정리 노트 만들기 →"));
      },
      applyPrefs: function () {
        $("workers").value = String(prefs.workers); $("quality").value = prefs.quality; $("sens").value = String(prefs.minPx);
        $("moving").checked = !!prefs.ignoreMoving; $("merge").checked = !!prefs.merge; $("caps").checked = prefs.ignoreCaptions === false;
        $("every").value = String(prefs.every || 1); $("dedup").checked = prefs.dedup !== false; $("subs").checked = prefs.subs !== false;
        applyMode();
      }
    };
  }
  function pickPrefs() { return { workers: prefs.workers, quality: prefs.quality, minPx: prefs.minPx, ignoreMoving: prefs.ignoreMoving, ignoreCaptions: prefs.ignoreCaptions, merge: prefs.merge, every: prefs.every, dedup: prefs.dedup, subs: prefs.subs, mode: prefs.mode }; }
  function jobPrefs() { return Object.assign(pickPrefs(), userSet || {}); }

  // =====================================================================
  // ROLE: worker inside a YouTube player embedded on the work page
  // =====================================================================
  function workerRole() {
    var parentOrigin = "";
    try { parentOrigin = (location.ancestorOrigins && location.ancestorOrigins[0]) || (document.referrer ? new URL(document.referrer).origin : ""); } catch (e) {}
    if (parentOrigin !== HOST_ORIGIN) return;
    var qs = new URLSearchParams(location.search), job = qs.get("lcjob"), slot = Number(qs.get("lcslot"));
    if (!job) return;
    function send(msg) { try { window.parent.postMessage(Object.assign({ lc: 1, job: job, slot: slot }, msg), parentOrigin); } catch (e) {} }
    var ready = null, busy = false, runs = 0, C = null, cur = null, mode = qs.get("lcq") || "", carry = null;
    // the video's length in seconds, or 0 while the player does not know it
    function lengthOf(v, mp) {
      var d = v ? v.duration : NaN;
      if (!(isFinite(d) && d > 0)) { try { d = api(mp).getDuration ? Number(api(mp).getDuration()) : NaN; } catch (e) { d = NaN; } }
      return isFinite(d) && d > 0 ? d : 0;
    }
    // the player's video element as it is now (YouTube may have swapped it since)
    function nowVideo() { var v = document.querySelector("#movie_player video, video"); if (v && ready && v !== ready.video) { ready.video = v; C = null; runs = 0; carry = null; } return ready.video; }
    send({ type: "hello" });

    // wait until the player shows the video (or refuses), skipping a pre-roll ad if there is one
    (async function watch() {
      var t0 = Date.now(), limit = 30000;
      while (Date.now() - t0 < limit) {
        await sleep(300);
        var err = playerError(document);
        if (err) { send({ type: "error", msg: err }); return; }
        var mp = document.getElementById("movie_player"), v = document.querySelector("#movie_player video, video");
        if (mp && isAd(mp)) { limit = Math.max(limit, Date.now() - t0 + 30000); trySkipAd(document); continue; }
        if (mp && v && v.readyState >= 1 && lengthOf(v, mp)) {
          var dur0 = lengthOf(v, mp);
          v.muted = true; try { if (api(mp).mute) api(mp).mute(); } catch (e) {}
          setQuality(mp, mode);
          var title = ""; try { title = (api(mp).getVideoData && api(mp).getVideoData().title) || ""; } catch (e) {}
          if (!title) title = (document.title || "").replace(/\s*-\s*YouTube\s*$/i, "").trim();
          // Changing the quality can make the player load the video afresh: for a moment it has no picture and does not
          // know its own length (and may even use a new video element). Wait until both are back and stay for half a second.
          var okSince = -1;
          for (var i = 0; i < 60; i++) {
            await sleep(250);
            v = document.querySelector("#movie_player video, video") || v;
            if (v.paused) { try { v.play().catch(function () {}); } catch (e) {} }
            if (v.videoWidth && lengthOf(v, mp)) { if (okSince < 0) okSince = i; if (i - okSince >= 2) break; } else okSince = -1;
          }
          v.muted = true;
          ready = { mp: mp, video: v };
          send({ type: "ready", dur: lengthOf(v, mp) || dur0, title: title, w: v.videoWidth || 1280, h: v.videoHeight || 720 });
          return;
        }
        if (v && v.paused) { try { var pp = v.play(); if (pp && pp.catch) pp.catch(function () {}); } catch (e) {} }
      }
      send({ type: "error", msg: "timeout" });
    })();

    window.addEventListener("message", async function (e) {
      if (e.origin !== parentOrigin || !e.data || e.data.lc !== 1 || e.data.job !== job) return;
      if (e.data.type === "stop") { stopReq = true; return; }
      if (e.data.type === "trim") { if (cur && cur.seq === e.data.seq) cur.P.end = Math.min(cur.P.end || Infinity, Number(e.data.end) || Infinity); return; }
      if (e.data.type === "shots" && !busy && ready) return takeShots(e.data);
      if (e.data.type === "subs" && ready) { var tr = null; try { tr = await getTranscript(ready.mp); } catch (err) { tr = { ok: false, why: String(err && err.message || err) }; } send({ type: "subs", tr: tr }); return; }
      if (e.data.type !== "run" || busy || !ready) return;
      busy = true; stopReq = false;
      Object.assign(prefs, e.data.prefs || {});
      var v = nowVideo(), mp = ready.mp, seq = e.data.seq;
      if (!C) { var G = makeGeom(e.data.w, e.data.h), full = document.createElement("canvas"); C = makeCapturer(G, v, full, full.getContext("2d")); C.noSnap = mode === "det"; }
      else { C.scenes = []; C.kept = []; C.pending = null; C.prevSig = null; }   // keep what was learned (moving parts, pointer)
      var P = { video: v, mp: mp, doc: document, warm: runs === 0, cont: !!e.data.cont, carry: carry };
      runs++; cur = { P: P, seq: seq };
      var tick = setInterval(function () { send({ type: "progress", seq: seq, pos: P.pos || e.data.start, rate: P.rate || 0, count: C.scenes.length, diag: P.diag || "", mt: P.mt || 0, ads: P.ads || 0, samples: C.samples, blanks: C.blanks, err: P.err || "", ahead: P.ahead || 0 }); }, 1000);
      await playPart(P, e.data.start, e.data.end, C);
      clearInterval(tick); cur = null; carry = P.carryOut || null;
      var scenes = [];
      for (var i = 0; i < C.scenes.length; i++) {
        var s = C.scenes[i], b = await s.blobP;
        if (b || C.noSnap) scenes.push({ t: s.t, ts: s.ts, g: s.sig.g, blank: s.sig.blank, blob: b || null });
      }
      send({ type: "done", seq: seq, start: e.data.start, bad: C.bad, scenes: scenes, mask: C.mask, pos: P.pos, ptr: C.pctx.ptr, tpl: C.pctx.tpl || null, samples: C.samples, blanks: C.blanks });
      busy = false;
    });

    // The photo job: go to each of the given moments and send back its picture in this player's (high) quality,
    // together with the small comparison picture, so the page can check it is the screen it asked for.
    async function takeShots(d) {
      busy = true; stopReq = false;
      Object.assign(prefs, d.prefs || {});
      var v = nowVideo(), mp = ready.mp, A = api(mp), seq = d.seq, state = "", beat = 0;
      var tick = setInterval(function () { send({ type: "progress", seq: seq, shots: true, diag: state, beat: ++beat, err: state === "로딩" ? (playerError(document) || "") : "" }); }, 1000);
      try { if (A.pauseVideo) A.pauseVideo(); } catch (e) {}
      try { v.pause(); } catch (e) {}
      var full = document.createElement("canvas"), fctx = full.getContext("2d"), sc = document.createElement("canvas"), G = null, sctx = null;
      for (var i = 0; i < d.times.length && !stopReq; i++) {
        var t = d.times[i], ok = false, tries = 0;
        while (!ok && tries < 2 && !stopReq) {
          if (isAd(mp)) { state = "광고"; trySkipAd(document); try { v.play(); } catch (e) {} await sleep(500); continue; }
          dismissStillWatching(document);
          ok = await showMoment(v, A, Math.min(t, Math.max(0, (v.duration || t) - 0.05)));
          if (!ok) { state = "로딩"; tries++; }
        }
        if (stopReq) break;
        state = "";
        var blob = null, g = null, blank = false;
        if (ok) try {
          var w = v.videoWidth, h = v.videoHeight;
          if (!G || G.vw !== w || G.vh !== h) { G = makeGeom(w, h); G.vw = w; G.vh = h; sc.width = G.w; sc.height = G.h; sctx = sc.getContext("2d", { willReadFrequently: true }); }
          if (full.width !== w || full.height !== h) { full.width = w; full.height = h; }
          fctx.drawImage(v, 0, 0, w, h);
          blob = await new Promise(function (r) { full.toBlob(function (b) { r(b); }, "image/jpeg", 0.9); });
          var sig = readSig(sctx, G, v, null); g = sig.g; blank = sig.blank;
        } catch (e) {}
        send({ type: "shot", seq: seq, k: d.keys[i], t: t, ok: ok, blob: ok ? blob : null, g: ok ? g : null, blank: blank, w: v.videoWidth, h: v.videoHeight });
      }
      clearInterval(tick);
      send({ type: "shots-done", seq: seq });
      busy = false;
    }
  }

  // =====================================================================
  // ROLE: the work page (GitHub page) — coordinator
  // =====================================================================
  function hostRole() {
    var preSubs = {};   // transcripts handed over by the YouTube tab, by video id
    var hasPip = !!(window.documentPictureInPicture && window.documentPictureInPicture.requestWindow);
    var FF_ANDROID = /Android/i.test(navigator.userAgent || "") && /Firefox\//i.test(navigator.userAgent || "");
    var pipNote0 = hasPip; try { if (localStorage.getItem("lcNoPip")) pipNote0 = false; } catch (e) {}
    var ui = makePanel(pipNote0 ? "'캡처 시작'을 누르면 작은 작업 창이 열려요. 그 창만 화면 어딘가에 떠 있으면, 이 창을 최소화하거나 다른 일을 해도 계속 진행돼요. 영상마다 ZIP이 다운로드 폴더에 저장돼요."
      : "'캡처 시작'을 누르면 화면 위쪽에 플레이어가 나타나요. 이 화면이 보이는 동안 진행돼요. 다른 앱이나 탭으로 가면 잠시 멈췄다가 돌아오면 이어서 하고, 탭이 닫혀도 다시 열면 하던 곳부터 계속해요. 영상마다 ZIP이 다운로드 폴더에 저장돼요.",
      pipNote0 ? "작은 작업 창이 열리고 거기서 진행돼요. 그 창만 떠 있으면 이 창은 최소화해도 돼요. 끝나면 이 탭이 정리 노트 페이지로 넘어가요(대본 없는 영상이 있으면 LiveWiki 버튼이 먼저 나와요)."
      : "화면 위쪽 플레이어로 진행돼요. 이 화면이 보이는 동안 진행되고, 다른 앱에 다녀와도 이어서 해요. 끝나면 이 탭이 정리 노트 페이지로 넘어가요(대본 없는 영상이 있으면 LiveWiki 버튼이 먼저 나와요).");
    if (FF_ANDROID) ui.status("안드로이드 파이어폭스에서는 안 돼요.", "이 브라우저는 유튜브 영상 화면을 읽지 못해요(브라우저 제한). Microsoft Edge 앱에 Tampermonkey를 설치해서 써 주세요.");
    var $ = ui.$, running = false, results = [], stage = null, waiters = {}, pip = null, pipNote = null, closingPip = false;
    // a steady clock that keeps ticking while this tab is hidden or minimized
    var ticker = null, tickers = [];
    function bsleep(ms) {
      return new Promise(function (res) {
        if (ticker === null) {
          try {
            ticker = new Worker(URL.createObjectURL(new Blob(["setInterval(function(){postMessage(0)},200)"], { type: "text/javascript" })));
            ticker.onmessage = function () { var now = Date.now(); tickers = tickers.filter(function (c) { if (c.due <= now) { c.res(); return false; } return true; }); };
          } catch (e) { ticker = false; }
        }
        if (ticker) { tickers.push({ due: Date.now() + ms, res: res }); setTimeout(res, ms + 1500); } else setTimeout(res, ms);
      });
    }
    var baseStatus = ui.status;
    ui.status = function (bold, rest) { baseStatus(bold, rest); if (pipNote) pipNote.textContent = (bold || "") + " " + (rest || ""); };
    function refresh() { $("go").textContent = running ? (stopReq ? "멈추는 중…" : "멈추기") : prefs.mode === "digest" ? "정리 자료 만들기" : "캡처 시작"; $("go").className = running ? "stop" : ""; $("go").disabled = running && stopReq; }
    function showResults() {
      ui.results(results.map(function (x) {
        var cls = x.status === "done" ? "ok" : x.status === "wait" ? "wait" : "bad";
        var t = (x.title || x.id) + " · " + (x.status === "done" ? "사진 " + x.count + "장" + (x.secs ? " (" + mins(x.secs).replace("약 ", "") + ")" : "") + (x.note ? " · " + x.note : "") : x.msg);
        return { cls: cls, text: t, lw: prefs.mode === "digest" && x.status === "done" && x.subsInfo && !/^대본 \d/.test(x.subsInfo) ? x.id : null };
      }));
    }
    refresh();
    function onMessage(e) {
      var d = e.data;
      if (!d || d.lc !== 1) return;
      if ((e.origin === YT_ORIGIN || e.origin === YT_MOBILE) && d.type === "subs-pre" && d.id) {
        if (d.tr) { preSubs[d.id] = d.tr; if (d.tr.ok) dbPut("sub:" + d.id, d.tr); }
        try { e.source.postMessage({ lc: 1, type: "subs-ack", id: d.id }, e.origin); } catch (er) {}
        return;
      }
      if (e.origin === YT_ORIGIN && d.job && waiters[d.job]) waiters[d.job](d);
    }
    window.addEventListener("message", onMessage);

    // the small always-on-top work window (Document Picture-in-Picture). Needs a click to open.
    async function openWorkWindow() {
      if (!window.documentPictureInPicture || !window.documentPictureInPicture.requestWindow || localStorage.getItem("lcNoPip")) return null;
      var w;
      try { w = await window.documentPictureInPicture.requestWindow({ width: 640, height: 400 }); } catch (e) { return null; }
      var d = w.document;
      d.title = "강의 캡처 작업 창";
      d.body.style.cssText = "margin:0;background:#0f0f0f;color:#C9D1DC;font:12px 'Malgun Gothic',system-ui,sans-serif;display:flex;flex-direction:column;height:100vh;overflow:hidden";
      pipNote = d.createElement("div");
      pipNote.style.cssText = "padding:6px 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid #2B3443;flex:none";
      pipNote.textContent = "준비 중…";
      d.body.appendChild(pipNote);
      w.addEventListener("message", onMessage);
      w.addEventListener("pagehide", function (ev) { if (ev && ev.target && ev.target !== w.document) return;   // a frame inside it unloading (Firefox reports those here too)
        pip = null; pipNote = null; stage = null; if (closingPip) { closingPip = false; return; } if (running) { stopReq = true; refresh(); ui.status("작업 창이 닫혀서 멈췄어요.", "다시 하려면 '캡처 시작'을 누르세요."); } });
      return w;
    }

    var pending = null; // links handed over from the YouTube panel, waiting for one click
    $("go").addEventListener("click", function () {
      if (running) { stopReq = true; refresh(); return; }
      ui.readPrefs(); savePrefs();
      var p = parseLinks($("links").value);
      if (!p.ids.length) { ui.status("유튜브 링크를 넣어 주세요.", p.bad ? "알아볼 수 없는 줄 " + p.bad + "개" : ""); return; }
      running = true; stopReq = false; refresh();
      var prev = resume && resume.ids.join() === p.ids.join() ? resume : null; resume = null;
      // ask for the work window right inside the click (the browser requires that)
      openWorkWindow().then(function (w) {
        pip = w;
        if (!w) ui.status(hasPip ? "작업 창을 열 수 없어서 이 탭에서 진행해요." : "시작했어요.", "다른 앱이나 탭으로 가면 잠시 멈추고, 돌아오면 이어서 해요.");
        $("links").value = ""; pending = null;
        runAll(p.ids, prev);
      });
    });
    // A job this page did not get to finish (the tab was closed, reloaded, or the phone threw it out of memory):
    // go on with it. Where a work window has to be opened this needs one click; otherwise it starts by itself.
    var resume = null;
    if (!/^#lc=/.test(location.hash)) dbGet("job").then(function (job) {
      if (!job || !job.ids || !job.ids.length || running || Date.now() - (job.at || 0) > 72 * 3600e3) return;
      if (!(job.results || []).some(function (x) { return x.status === "wait"; })) { dbDel("job"); return; }
      resume = job;
      Object.assign(prefs, job.prefs || {}); savePrefs(); ui.applyPrefs();
      $("links").value = job.ids.map(watchUrl).join("\n"); setOpen(true);
      if (hasPip && !localStorage.getItem("lcNoPip")) {
        $("go").textContent = "이어서 하기";
        ui.status("끝내지 못한 작업이 있어요.", "'이어서 하기'를 누르면 하던 곳부터 계속해요. 새로 하려면 링크를 바꾸고 누르세요.");
      } else {
        ui.status("끝내지 못한 작업을 이어서 해요…", "그만두려면 '멈추기'를 누르세요.");
        $("links").value = ""; resume = null;
        runAll(job.ids, job);
      }
    });

    // started from the YouTube panel: #lc=<json> — fill in the links; one click starts (the work window needs a click)
    var m = location.hash.match(/^#lc=(.+)$/);
    if (m) {
      var job = null; try { job = JSON.parse(decodeURIComponent(m[1])); } catch (e) {}
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      if (job && job.ids && job.ids.length) {
        Object.assign(prefs, job.prefs || {}); savePrefs(); ui.applyPrefs();
        Object.keys(job.subs || {}).forEach(function (id) { var t = job.subs[id]; if (!/^[\w-]{11}$/.test(id) || !t) return; preSubs[id] = t; if (t.ok && t.segs) dbPut("sub:" + id, t); });
        pending = job.ids.filter(function (id) { return /^[\w-]{11}$/.test(id); });
        $("links").value = pending.map(watchUrl).join("\n");
        setOpen(true);
        if (!hasPip || localStorage.getItem("lcNoPip")) {
          // nothing that needs a click here (no work window on a phone): start right away
          ui.status("바로 시작해요…", "영상 " + pending.length + "개");
          setTimeout(function () { if (!running) $("go").click(); }, 800);
        } else {
          ui.status(prefs.mode === "digest" ? "'정리 자료 만들기'를 한 번 눌러 주세요." : "'캡처 시작'을 한 번 눌러 주세요.", "작은 작업 창이 열리고 영상 " + pending.length + "개를 처리해요(브라우저가 이 창은 클릭으로만 열게 해요). 그다음엔 이 창을 최소화해도 돼요.");
          try { $("go").focus(); } catch (e) {}
        }
      }
    }
    function setOpen(o) { if (!o) return; try { root_open(); } catch (e) {} }
    function root_open() { var bd = $("bd"); if (bd && bd.style.display === "none") $("hd").click(); }

    // Players must sit in a real https page of this site: YouTube refuses players whose page has no address (error 153),
    // and GitHub's "page not found" page forbids frames inside it. So the work window loads this very page (marked as a stage)
    // and the players go inside it. The players lie on top of each other at full size: each stays big enough for YouTube
    // and inside the visible area (browsers stop drawing players that are scrolled out of sight, and phones are narrow).
    var STAGE_URL = HOST_URL + "?lc-stage=1";
    var usePip = true;
    async function openStage() {
      closeStage();
      var holder = null, doc = document;
      if (pip && usePip) {
        holder = pip.document.createElement("iframe");
        holder.style.cssText = "flex:1;min-height:0;width:100%;border:0;background:#0f0f0f";
        holder.allow = "autoplay; encrypted-media";
        holder.src = STAGE_URL;
        pip.document.body.appendChild(holder);
        await new Promise(function (res) { holder.addEventListener("load", res, { once: true }); setTimeout(res, 15000); });
        try { doc = holder.contentDocument; } catch (e) { doc = null; }
        if (!doc || !doc.body) { holder.remove(); holder = null; doc = document; }
        else {
          doc.documentElement.style.cssText = "background:#0f0f0f;height:100%";
          doc.body.textContent = ""; doc.body.style.cssText = "margin:0;background:#0f0f0f;height:100%;overflow:hidden";
          holder.contentWindow.addEventListener("message", onMessage);
        }
      }
      var narrow = (window.innerWidth || 1000) < 700;
      stage = doc.createElement("div");
      stage.id = "lecture-capture-stage";
      stage.style.cssText = (holder ? "height:100%;" : narrow ? "position:fixed;left:0;right:0;top:0;height:min(42vh,62vw);z-index:2147482999;" :
        "position:fixed;left:16px;top:16px;right:352px;bottom:16px;z-index:2147482999;border-radius:12px;") +
        "box-sizing:border-box;background:#0f0f0f;display:flex;flex-direction:column;gap:4px;padding:4px;overflow:hidden";
      stage.holder = holder;
      var per = doc.createElement("div"); per.id = "lc-per";
      per.style.cssText = "flex:none;color:#9AA4B5;font:11px system-ui;padding:0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis";
      per.textContent = "플레이어 준비 중…";
      var area = doc.createElement("div");
      area.style.cssText = "position:relative;flex:1;min-height:0;background:#000;border-radius:6px;overflow:hidden";
      stage.appendChild(per); stage.appendChild(area);
      stage.addSlot = function () {
        var slot = doc.createElement("div");
        slot.style.cssText = "position:absolute;inset:0;background:#000";
        area.appendChild(slot); return slot;
      };
      doc.body.appendChild(stage);
    }
    function closeStage() { if (stage) { if (stage.holder) stage.holder.remove(); stage.remove(); stage = null; } }

    // one embedded player; resolves with its "ready" message, or null (with the reason) if YouTube refuses to play it here
    var sessionCap = 0, embedsWorked = false;
    var openEpoch = 0;   // bumped when the browser has thrown the players out: whoever is still waiting for one stops waiting
    function openPlayer(slot, id, job, k, onMsg, q) {
      return new Promise(function (resolve) {
        var key = job + "-" + k, settled = false, ep = openEpoch;
        var f = slot.ownerDocument.createElement("iframe");
        f.src = YT_ORIGIN + "/embed/" + id + "?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&lcjob=" + key + "&lcslot=" + k + "&lcq=" + encodeURIComponent(q || "");
        f.allow = "autoplay; encrypted-media"; f.referrerPolicy = "strict-origin-when-cross-origin";
        f.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
        slot.appendChild(f);
        var deadline = Date.now() + 50000, helloBy = Date.now() + 15000, hello = false;
        function finish(v) { if (settled) return; settled = true; resolve(v); }
        waiters[key] = function (d) {
          if (d.type === "hello") { hello = true; return; }
          if (d.type === "subs") { if (subsWait[key]) { subsWait[key](d.tr || null); delete subsWait[key]; } return; }
          if (d.type === "ready") finish({ frame: f, key: key, ready: d });
          else if (d.type === "error") { f.remove(); finish({ error: d.msg || "error" }); }
          else onMsg(d);
        };
        (async function () {
          while (!settled) {
            await bsleep(500);
            if (held()) { helloBy += 500; deadline += 500; continue; }
            if (ep !== openEpoch) { f.remove(); finish({ error: "응답 없음" }); continue; }
            if (!hello && Date.now() > helloBy) { f.remove(); finish({ error: "blocked" }); }
            else if (stopReq || !stage || Date.now() > deadline) { f.remove(); finish({ error: hello ? "준비 안 됨" : "timeout" }); }
          }
        })();
      });
    }
    // Is this page off the screen with nothing else showing the players? Then the browser has stopped the videos
    // (another app in front, another tab, screen off). The work window on a computer keeps them going, so that doesn't count.
    function held() { return !!document.hidden && !(pip && usePip); }
    var subsWait = {};
    // the video's captions, asked of one of its players (kept on the device so a resumed job still has them)
    function askSubs(P, id) {
      return dbGet("sub:" + id).then(function (have) {
        if (preSubs[id] && preSubs[id].ok) return preSubs[id];
        if (have && have.ok) return have;
        return new Promise(function (res) {
          subsWait[P.key] = res; post(P, { type: "subs" });
          setTimeout(function () { if (subsWait[P.key]) { delete subsWait[P.key]; res(null); } }, 30000);
        }).then(function (tr) { if (tr && tr.ok) dbPut("sub:" + id, tr); return tr; });
      });
    }
    function post(P, msg) { try { P.frame.contentWindow.postMessage(Object.assign({ lc: 1, job: P.key }, msg), YT_ORIGIN); } catch (e) {} }

    var wakeLock = null;
    async function keepAwake(on) {
      try {
        if (on && !wakeLock && navigator.wakeLock) { wakeLock = await navigator.wakeLock.request("screen"); wakeLock.addEventListener("release", function () { wakeLock = null; }); }
        else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
      } catch (e) {}
    }
    document.addEventListener("visibilitychange", function () { if (running && document.visibilityState === "visible") keepAwake(true); });

    function rememberJob(ids) {
      return dbPut("job", { ids: ids, prefs: jobPrefs(), at: Date.now(),
        results: results.map(function (x) { return { id: x.id, status: x.status, msg: x.msg || "", title: x.title || "", count: x.count || 0, secs: x.secs || 0, same: x.same || 0, leftKey: x.leftKey || "" }; }) });
    }
    async function runAll(ids, prev) { enterMode(); try { return await runAll0(ids, prev); } finally { leaveMode(); } }
    async function runAll0(ids, prev) {
      running = true; stopReq = false; refresh(); keepAwake(true);
      results = ids.map(function (id, k) {
        var old = prev && prev.results && prev.results[k];
        return old && old.id === id && old.status !== "wait" ? old : { id: id, status: "wait", msg: "대기" };
      });
      showResults();
      if (!prev) { await dbDelAll("seg:"); await dbDelAll("pic:"); await dbDelAll("sub:"); for (var pk in preSubs) if (preSubs[pk] && preSubs[pk].ok) await dbPut("sub:" + pk, preSubs[pk]); }
      await rememberJob(ids);
      var solo = [], soloOpen = 0, noReadAll = false, pauses = 0, pausedAll = false;
      for (var i = 0; i < ids.length && !stopReq; i++) {
        if (results[i].status !== "wait") continue;                      // finished before the page was closed
        var r = await runParts(ids[i], i + 1 + "/" + ids.length, results[i]);
        if (r === "paused" && !stopReq) {
          // YouTube stopped sending video (it does that after a lot was fetched in a short time). Everything done so far
          // is saved on the device: rest two minutes and carry on from there, a few times; after that leave it to a click.
          showResults(); await rememberJob(ids);
          if (pauses >= 3) { pausedAll = true; break; }
          pauses++;
          for (var sec = 120; sec > 0 && !stopReq; sec--) {
            ui.status("유튜브가 영상을 보내 주지 않아 쉬는 중이에요 (" + pauses + "/3)", sec + "초 뒤 하던 곳부터 자동으로 이어서 해요. 지금까지 한 것은 저장돼 있어요.");
            await bsleep(1000);
          }
          if (!stopReq) { results[i].msg = "이어서 하는 중"; showResults(); i--; }
          continue;
        }
        await dbDelAll("seg:" + ids[i] + ":"); await dbDelAll("pic:" + ids[i] + ":"); await dbDel("sub:" + ids[i]);
        if (!stopReq) await rememberJob(ids);
        if (r === "noread" && !FF_ANDROID) { results[i].msg = "화면이 처음부터 계속 검은색이라 멈췄어요"; showResults(); continue; }
        if (r === "noread") {
          for (var k = i + 1; k < ids.length; k++) { results[k].status = "bad"; results[k].msg = "건너뜀"; }
          noReadAll = true; break;
        }
        if (r === "noembed" || r === "stuck") {
          results[i].status = "wait";
          results[i].msg = (r === "noembed" ? "이 영상은 퍼가기가 막혀 있어요" : "작업 창에서 재생되지 않았어요" + (results[i].why ? " (" + results[i].why + ")" : "")) + " · 마지막에 유튜브 탭에서 따로 처리해요";
          solo.push(i);
        }
        showResults();
      }
      closeStage();
      if (pip) { closingPip = true; try { pip.close(); } catch (e) {} pip = null; pipNote = null; }
      if (solo.length && !stopReq) soloOpen = await runSoloBatch(solo.map(function (k) { return ids[k]; }), solo.map(function (k) { return results[k]; }));
      showResults();
      var n = results.filter(function (x) { return x.status === "done"; }).length;
      if (noReadAll) ui.status("이 브라우저는 유튜브 화면을 읽을 수 없어요.", FF_ANDROID ? "안드로이드 파이어폭스의 제한이에요. Microsoft Edge 앱 + Tampermonkey로 해 주세요." : "다른 브라우저(크롬, 엣지)로 해 주세요.");
      else if (stopReq) ui.status("멈췄어요.", "끝난 영상 " + n + "개는 저장했어요.");
      else if (pausedAll) ui.status("잠시 멈췄어요.", "유튜브가 영상을 보내 주지 않고 있어요(짧은 시간에 많이 받으면 한동안 이렇게 돼요). 지금까지 한 것은 저장돼 있으니, 10~20분 뒤 '이어서 하기'를 누르면 하던 곳부터 계속해요.");
      else if (soloOpen) ui.status("거의 끝났어요.", "영상 " + n + "개를 저장했어요. 남은 " + soloOpen + "개는 새로 열린 유튜브 탭이 처리하고 직접 ZIP으로 저장해요. 그 탭을 화면에 띄워 두세요.");
      else ui.status("끝났어요.", "영상 " + n + "개를 저장했어요. 다운로드 폴더를 확인하세요.");
      if (pausedAll && !stopReq) {
        resume = await dbGet("job");
        running = false; stopReq = false; refresh(); keepAwake(false);
        if (resume) { $("links").value = ids.map(watchUrl).join("\n"); $("go").textContent = "이어서 하기"; }
        return;
      }
      await dbDel("job"); await dbDelAll("seg:"); await dbDelAll("pic:"); await dbDelAll("sub:");
      running = false; stopReq = false; refresh(); keepAwake(false);
      // 영상 정리: everything saved and every video has its words: go on to the note page by itself
      var allWords = results.every(function (x) { return x.status !== "done" || /^대본 \d/.test(x.subsInfo || ""); });
      if (prefs.mode === "digest" && n && !soloOpen && !noReadAll && allWords) goDigestSoon();
    }
    function goDigestSoon() {
      var left = 6, cancel = false, li = h("li", { style: "list-style:none;margin:8px 0 0 -16px;font-size:12px;color:var(--fg)" }), sp = h("span", {});
      var b = h("button", { text: "여기 머무르기", style: "margin-left:8px;padding:3px 8px;font-size:11px;background:var(--bg);color:var(--ac)" });
      b.addEventListener("click", function () { cancel = true; li.remove(); });
      li.appendChild(sp); li.appendChild(b); $("res").appendChild(li);
      (function tick() {
        if (cancel) return;
        if (left <= 0) { location.href = DIGEST_URL; return; }
        sp.textContent = left + "초 뒤 정리 노트 페이지로 넘어가요. " + (results.some(function (x) { return x.handed; }) ? "자료는 자동으로 넘어가서 바로 정리돼요." : "거기서 방금 받은 ZIP을 고르기만 하면 돼요."); left--;
        setTimeout(tick, 1000);
      })();
    }

    // One video. Pieces of it go to several players at once.
    // "자동": start with a few players and keep adding while the total speed still goes up; stop adding (and give the
    // extra players back) as soon as it doesn't, or as soon as YouTube leaves a new player waiting. The count that worked
    // best is remembered and used as the start for the next video.
    async function runParts(id, label, res, opt) {
      opt = opt || {};
      var began = Date.now(), job = "j" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      res.status = "wait"; res.msg = "여는 중"; res.why = ""; showResults();
      ui.status(label, "영상을 여는 중…");
      var mobile = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent || "");
      // Two passes (when repeats are skipped): light players find the moments where the screen changes, then the photos
      // of just those moments are taken in the chosen quality. Without skipping repeats every look is a photo: one pass.
      var two = prefs.dedup !== false, pmode = two ? "det" : prefs.quality;
      // A phone has little memory for video players: too many and the browser throws them all out (the sad face).
      // Light players: up to 6; full-quality ones: up to 3. What made the browser give up before is remembered.
      var auto = !(prefs.workers > 0), safe = Number(load(SKEY, 0)) || 0;
      var cap = opt.max || (auto ? (mobile ? (two ? ((navigator.deviceMemory || 8) <= 4 ? 4 : 6) : 3) : 16) : Math.min(16, prefs.workers));
      if (auto && safe) cap = Math.max(1, Math.min(cap, safe));
      if (auto && sessionCap) cap = Math.max(1, Math.min(cap, sessionCap));   // YouTube slowed us down earlier in this run
      var learned = Number(load(BKEY, 0)) || 0, first = mobile ? (two ? 3 : 2) : 4;
      var want = Math.min(cap, opt.start || (auto ? Math.max(first, Math.min(cap, learned || first)) : cap)), everMoved = false, noRead = false, mostPlayers = 0;
      await openStage();
      var byKey = {}, players = [], nextK = 0, outs = [], badVideo = false, queue = [], segs = [], errLog = [];
      var dur = 0, title = id, w = 1280, hgt = 720, stopAt = 0, STUCK = 25000, pkey = prefKey(), preDone = 0;

      function onMsg(d) {
        var P = byKey[d.job]; if (!P || !P.alive) return;
        P.lastMsg = Date.now();
        if (d.type === "progress" && P.seg && d.seq === P.seg.i) {
          P.rate = d.rate || 0; P.diag = d.diag || ""; P.count = d.count || 0; P.samples = d.samples || 0; P.blanks = d.blanks || 0;
          if (d.err) { if (!P.err) P.errAt = Date.now(); P.err = d.err; } else { P.err = ""; P.errAt = 0; }
          if (d.pos > (P.pos || 0) + 0.1) { P.pos = d.pos; P.progAt = Date.now(); if (d.pos > P.seg.start + 1) { everMoved = true; P.moved = true; } }
          // warming up (video time moving) or waiting out an ad counts as alive
          if (d.mt > (P.mt || 0) + 0.2 || d.ads !== P.ads) { P.mt = d.mt; P.ads = d.ads; P.progAt = Date.now(); }
        } else if (d.type === "done" && P.seg && d.seq === P.seg.i) {
          if (d.bad) badVideo = true;
          everMoved = true; P.moved = true; P.samples = d.samples || 0; P.blanks = d.blanks || 0; P.count = 0;
          var seg = P.seg; seg.done = true; P.seg = null; P.rate = 0; P.diag = ""; P.lastEnd = seg.end;
          // copy the pictures out now: once a player's frame is gone, Firefox add-ons can no longer read what it sent
          // (kept apart from the message itself, which Firefox add-ons may not change)
          var pics = []; if (!two) for (var q = 0; q < d.scenes.length; q++) pics.push(copyPic(d.scenes[q].blob));
          outs.push({ start: seg.start, d: d, pics: pics });
          keepPiece(seg, d, pics);
          if (P.drain) dismiss(P); else assign(P);
        }
      }
      // write a finished piece to the device, so it need not be done again if this page goes away
      function keepPiece(seg, d, pics) {
        try {
          var rec = { dur: dur, key: pkey, start: seg.start, end: seg.end, mask: d.mask, ptr: d.ptr || null, tpl: d.tpl || null, samples: d.samples || 0, blanks: d.blanks || 0, scenes: [] };
          for (var q = 0; q < d.scenes.length; q++) rec.scenes.push({ t: d.scenes[q].t, ts: d.scenes[q].ts, g: d.scenes[q].g, blank: !!d.scenes[q].blank });
          Promise.all(pics).then(function (arr) { rec.pics = arr; return dbPut("seg:" + id + ":" + String(Math.round(seg.start * 10)).padStart(7, "0"), rec); }).catch(function (e) { if (DBG) console.log("[lc] keep failed: " + e.message); });
        } catch (e) { if (DBG) console.log("[lc] keep threw: " + e.message); }
      }
      async function addPlayers(n) {
        var slots = []; for (var i = 0; i < n; i++) slots.push(stage.addSlot());
        var opened = await Promise.all(slots.map(function (slot) { return openPlayer(slot, id, job, nextK++, onMsg, pmode); }));
        var errs = [];
        opened.forEach(function (o, i) {
          if (o && !o.error) { o.slot = slots[i]; o.alive = true; o.seg = null; o.rate = 0; o.diag = ""; o.mt = 0; o.ads = 0; o.lastMsg = Date.now(); byKey[o.key] = o; players.push(o); }
          else { errs.push((o && o.error) || "error"); errLog.push((o && o.error) || "error"); try { slots[i].remove(); } catch (e) {} }
        });
        return errs;
      }
      function alive() { return players.filter(function (P) { return P.alive; }); }
      function working() { return players.filter(function (P) { return P.alive && !P.drain; }); }
      // when nothing is waiting, split the biggest piece still being played and give its second half to the idle player
      function steal() {
        var B = null, left = 0, now = Date.now();
        players.forEach(function (Q) {
          if (!Q.alive || !Q.seg || now - Q.progAt > 6000) return;
          var l = Q.seg.end - Math.max(Q.pos || 0, Q.seg.start);
          if (l > left) { left = l; B = Q; }
        });
        if (!B || left < 30) return null;
        var split = Math.max(B.pos || 0, B.seg.start) + left / 2 + 3, oldEnd = B.seg.end;
        B.seg.end = split;
        post(B, { type: "trim", seq: B.seg.i, end: split });
        var ns = { i: segs.length, start: split - 1, end: oldEnd, tries: 0 };
        segs.push(ns); return ns;
      }
      // Which waiting piece next? First choice: the one right after the piece this player just finished - its video is
      // already loaded and the player keeps its speed. Otherwise the start of a stretch nobody is heading into, or the
      // middle of the longest stretch. So every player works along a stretch of its own instead of hopping around.
      function near(a, b) { return Math.abs(a - b) < 1.5; }
      function pick(P) {
        P.cont = false;
        if (!queue.length) return null;
        queue.sort(function (x, y) { return x.start - y.start; });
        if (typeof P.lastEnd === "number") for (var i = 0; i < queue.length; i++) if (near(queue[i].start, P.lastEnd - 1)) { P.cont = true; return queue.splice(i, 1)[0]; }
        var runs = [], cur = null, bestRun = null;
        queue.forEach(function (sg, idx) { if (cur && near(sg.start, queue[idx - 1].end - 1)) cur.n++; else { cur = { at: idx, n: 1 }; runs.push(cur); } });
        runs.forEach(function (r) {
          var first = queue[r.at];
          r.owned = players.some(function (Q) { return Q.alive && Q !== P && ((Q.seg && near(first.start, Q.seg.end - 1)) || (!Q.seg && typeof Q.lastEnd === "number" && near(first.start, Q.lastEnd - 1))); });
          r.score = r.owned ? r.n / 2 : r.n + 0.5;
          if (!bestRun || r.score > bestRun.score) bestRun = r;
        });
        return queue.splice(bestRun.owned ? bestRun.at + Math.floor(bestRun.n / 2) : bestRun.at, 1)[0];
      }
      function assign(P) {
        if (!P.alive || P.seg || P.drain || stopReq) return;
        var seg = pick(P) || steal(); if (!seg) return;
        P.seg = seg; P.pos = seg.start; P.mt = 0; P.progAt = Date.now(); P.diag = "시작 중";
        post(P, { type: "run", seq: seg.i, start: seg.start, end: seg.end, cont: !!P.cont, w: w, h: hgt, prefs: pickPrefs() });
      }
      // a player that stopped moving: put its piece back for another player and take this one away
      function retire(P, notItsFault) {
        P.alive = false; delete waiters[P.key];
        if (P.seg) { var sg = P.seg; P.seg = null; if (!notItsFault) sg.tries++; if (sg.tries < 4) queue.unshift(sg); else sg.lost = true; }
        errLog.push(P.diag || "진행 없음");
        post(P, { type: "stop" });
        try { P.slot.remove(); } catch (e) {}
      }
      // a player that is no longer needed (finished its piece)
      function dismiss(P) { P.alive = false; delete waiters[P.key]; post(P, { type: "stop" }); try { P.slot.remove(); } catch (e) {} }

      var errs = await addPlayers(want);
      if (stopReq) { closeStage(); res.status = "bad"; res.msg = "멈춤"; return "stopped"; }
      if (!players.length) {
        closeStage();
        res.why = summarize(errs);
        var addr = errs.some(function (e) { return /153/.test(e) || e === "blocked"; });
        if (addr && pip && usePip) { usePip = false; ui.status(label, "작업 창에서 재생이 막혀 이 탭에서 다시 시도해요. 이 탭을 화면에 띄워 두세요."); return runParts(id, label, res, { start: Math.min(want, 3) }); }
        if (/150|101|소유자|owner/i.test(errs.join(" "))) return "noembed";
        if (embedsWorked || ((await dbAll("seg:" + id + ":")) || []).length) {
          // players worked here a moment ago: YouTube is holding back, this is not a video that can't be shown here
          sessionCap = Math.max(2, Math.ceil(want / 2));
          res.status = "wait"; res.msg = "유튜브가 영상을 보내 주지 않아 잠시 멈췄어요" + (res.why ? " (" + res.why + ")" : "");
          return "paused";
        }
        return "stuck";
      }
      var r0 = players[0].ready; title = r0.title || id; w = r0.w; hgt = r0.h; res.title = title;
      if (prefs.subs !== false && !res.subsP) res.subsP = askSubs(players[0], id);
      dur = 0; players.forEach(function (P) { var d = Number(P.ready && P.ready.dur); if (isFinite(d) && d > dur) dur = d; });
      if (!(dur > 0)) {
        // no player could tell how long the video is: nothing can be planned. Try once more, then leave it for later.
        players.forEach(function (P) { dismiss(P); }); closeStage();
        if (!opt.again) { ui.status(label, "영상 길이를 읽지 못해 다시 열어요…"); await bsleep(2000); return runParts(id, label, res, { again: true }); }
        res.status = "wait"; res.msg = "영상 길이를 읽지 못했어요(실시간 방송이거나, 유튜브가 영상을 보내 주지 않아요)"; return "paused";
      }
      // pieces of 30 s to 2.5 min; the last ones get split further when players run out of work
      // (pieces of at most a minute of video: a finished piece is safe on the device, so little is lost if the page goes away)
      var pieceLen = Math.max(30, Math.min(60, dur / (Math.max(cap, players.length) * 2)));
      // pieces already done before this page was closed or reloaded: take them over and only do what is missing
      var saved = (await dbAll("seg:" + id + ":")) || [], covered = [];
      saved.forEach(function (rec) {
        if (!rec || rec.key !== pkey || Math.abs(rec.dur - dur) > 1.5 || !rec.scenes || (!two && (!rec.pics || rec.pics.length !== rec.scenes.length))) return;
        outs.push({ start: rec.start, d: { scenes: rec.scenes, mask: rec.mask, ptr: rec.ptr, tpl: rec.tpl, samples: rec.samples, blanks: rec.blanks }, pics: (rec.pics || []).map(function (pc) { return Promise.resolve(pc); }) });
        covered.push([rec.start, rec.end]);
      });
      covered.sort(function (x, y) { return x[0] - y[0]; });
      var gaps = [], cursor = 0;
      covered.forEach(function (c) { if (c[0] > cursor + 1) gaps.push([cursor, c[0]]); cursor = Math.max(cursor, c[1] - 1); });
      if (!covered.length) gaps.push([0, dur]); else if (dur > cursor + 1.5) gaps.push([cursor, dur]);
      gaps.forEach(function (gp) {
        var n = Math.max(1, Math.ceil((gp[1] - gp[0]) / pieceLen)), len = (gp[1] - gp[0]) / n;
        for (var j = 0; j < n; j++) segs.push({ i: segs.length, start: gp[0] + j * len, end: Math.min(dur, gp[0] + (j + 1) * len + 1), tries: 0 });
        preDone -= gp[1] - gp[0];
      });
      preDone += dur;
      if (covered.length) ui.status(label, "전에 하던 곳부터 이어서 해요 (" + Math.round(100 * preDone / dur) + "%까지 되어 있어요)…");
      queue = segs.slice();
      players.forEach(assign);

      var batch = players.length, shrinks = 0, stopSent = false, crashed = 0, everCrashed = false;
      var topSpeed = 0, slowSince = 0, backoffs = 0, lastGain = Date.now(), lastDone = -1, starvedOut = false;
      // (speeds are compared by the best 8-second average each player count reached once it had settled)
      var peak = 0, settleAt = Date.now() + 12000;
      var hist = [], thr = 0, rampAt = Date.now() + 16000, before = null, adding = false, rampDone = !auto, best = 0, lastTick = Date.now();
      while (true) {
        await bsleep(1000);
        var now = Date.now();
        if (!stopReq && (held() || now - lastTick > 6000)) {
          // This page is not on the screen (or the phone had put it to sleep): the videos stand still, and that is not
          // the players' fault. Wait, keep everything, and go on when the page is back.
          while (held() && !stopReq) {
            ui.status(label, "이 화면이 가려져서 잠시 멈췄어요. 지금까지 한 것은 그대로 있어요. 이 화면으로 돌아오면 바로 이어서 해요.");
            await bsleep(1000);
          }
          now = Date.now();
          players.forEach(function (P) { P.progAt = now + 8000; P.lastMsg = now + 8000; });
          lastGain = now; slowSince = 0;
          hist = []; rampAt = Math.max(rampAt, now + 16000); settleAt = now + 10000;
          if (before) { best = working().length; before = null; }
        }
        lastTick = now;
        if (stopReq && !stopSent) {
          stopSent = true; stopAt = now; queue = [];
          players.forEach(function (P) { if (P.alive && P.seg) post(P, { type: "stop" }); });
        }
        var busy = players.filter(function (P) { return P.alive && P.seg; });
        if (!busy.length && !queue.length && !adding) break;
        if (stopReq && now - stopAt > 10000) break;

        // how far along, and how fast overall (video seconds done per second, over the last 8 seconds)
        var doneLen = preDone, left = 0, count = 0;
        segs.forEach(function (sg) { if (sg.done) doneLen += sg.end - sg.start - (sg.end < dur ? 1 : 0); });
        busy.forEach(function (P) { var p = Math.max(P.pos || 0, P.seg.start); doneLen += p - P.seg.start; left += Math.max(0, P.seg.end - p); });
        queue.forEach(function (sg) { left += sg.end - sg.start; });
        outs.forEach(function (o) { count += o.d.scenes.length; });
        busy.forEach(function (P) { count += P.count || 0; });
        // this browser hands over only blank pictures of the video (Firefox on Android does): stop now instead of playing it all
        var totS = 0, totB = 0; players.forEach(function (P) { totS += P.samples || 0; totB += P.blanks || 0; });
        if (totS >= 80 && totB === totS) { noRead = true; queue = []; players.forEach(function (P) { if (P.alive) dismiss(P); }); break; }
        hist.push({ t: now, d: doneLen }); if (hist.length > 40) hist.shift();
        var ref = null; for (var k = hist.length - 1; k >= 0; k--) if (now - hist[k].t >= 8000) { ref = hist[k]; break; }
        if (ref) thr = Math.max(0, (doneLen - ref.d) / ((now - ref.t) / 1000));
        if (ref && now >= settleAt) { peak = Math.max(peak, thr); topSpeed = Math.max(topSpeed, thr); }
        if (doneLen > lastDone + 2) { lastDone = doneLen; lastGain = now; }

        if (!stopReq) {
          // players that have gone completely silent: the browser has thrown them out (out of memory: the sad face)
          var dead = busy.filter(function (P) { return now - (P.lastMsg || 0) > 8000; });
          if (dead.length) {
            crashed = Math.max(crashed, alive().length); openEpoch++;
            dead.forEach(function (P) { P.diag = "응답 없음"; retire(P, true); });
            busy = players.filter(function (P) { return P.alive && P.seg; });
          }
          // a player in which YouTube itself shows an error: no point waiting
          busy.filter(function (P) { return P.err && now - P.errAt > 6000; }).forEach(function (P) { errLog.push("유튜브: " + String(P.err).slice(0, 60)); P.diag = ""; retire(P); });
          busy = players.filter(function (P) { return P.alive && P.seg; });
          // YouTube has started to send the video much more slowly than before (it does that to someone fetching a lot
          // in a short time). More players only make it worse: go on with half of them after a short rest.
          var slow = ref && now >= settleAt && !adding && busy.length >= 2 && topSpeed > 0 && thr < 0.3 * topSpeed;
          slowSince = slow ? (slowSince || now) : 0;
          if (slowSince && now - slowSince > 20000 && backoffs < 3) {
            backoffs++; slowSince = 0;
            var keep = Math.max(1, Math.ceil(working().length / 2)), all = working();
            all.slice(keep).forEach(function (P) { retire(P, true); });
            cap = keep; rampDone = true; before = null; best = keep; sessionCap = Math.max(2, keep);
            ui.status(label, "유튜브가 영상을 느리게 보내기 시작했어요. 플레이어를 " + keep + "개로 줄이고 15초 쉬었다가 계속해요…");
            await bsleep(15000);
            now = Date.now(); lastTick = now; lastGain = Math.max(lastGain, now - 60000);
            players.forEach(function (P) { P.progAt = now + 5000; P.lastMsg = now + 5000; });
            hist = []; peak = 0; settleAt = now + 10000; topSpeed = topSpeed * 0.5;
            busy = players.filter(function (P) { return P.alive && P.seg; });
          }
          // nothing at all for two and a half minutes: stop here (what is done stays saved) rather than spin forever
          if (now - lastGain > 150000) { starvedOut = true; errLog.push("2분 30초 동안 진행 없음"); break; }
          var stuck = busy.filter(function (P) { return now - P.progAt > STUCK; });
          if (stuck.length) {
            var others = busy.some(function (P) { return now - P.progAt < 5000 && P.moved; });
            stuck.forEach(retire);
            // some play and some don't: this is as many as YouTube will play at once here
            if (others) { cap = Math.max(1, working().length); rampDone = true; before = null; best = cap; }
          }
          alive().forEach(assign);
          if (crashed && !alive().length && queue.length && !adding) {
            // start again with a third fewer, and don't go above that on this device for now
            if (shrinks >= 6) break;
            batch = Math.max(1, crashed - Math.max(1, Math.round(crashed / 3))); crashed = 0; shrinks++; cap = batch; rampDone = true; before = null; best = batch; everCrashed = true;
            save(SKEY, batch); save(BKEY, batch);
            ui.status(label, "플레이어가 너무 많아 브라우저가 버티지 못했어요. " + batch + "개로 줄여서 하던 곳부터 이어서 해요…");
            await bsleep(1500);
            await addPlayers(batch);
            alive().forEach(assign);
          } else if (!alive().length && queue.length && !adding) {
            // every player got stuck. If some had been playing, YouTube may not feed this many at once: try half as many.
            // (if none ever played, fewer won't help either: YouTube would have let at least one of them play)
            if (!everMoved || batch <= 1 || shrinks >= 4) break;
            batch = Math.max(1, Math.floor(batch / 2)); shrinks++; cap = Math.min(cap, batch); rampDone = true;
            ui.status(label, "유튜브가 플레이어 여러 개를 동시에 재생해 주지 않아 " + batch + "개로 다시 시도해요…");
            await addPlayers(batch);
            alive().forEach(assign);
          }
          // 자동: judge the last step up, then maybe take another
          if (!rampDone && !adding && now >= rampAt) {
            var n = working().length, healthy = busy.length > 0 && busy.every(function (P) { return now - P.progAt < 6000; });
            if (before) {
              if (peak >= before.thr * 1.12) { best = n; before = null; }
              else {
                // no faster with more players (computer, connection or YouTube is at its limit): go back
                var extra = working().slice(before.n);
                extra.forEach(function (P) { if (P.seg) P.drain = true; else dismiss(P); });
                cap = before.n; best = before.n; before = null; rampDone = true;
              }
            } else if (!best && healthy) best = n;
            if (!rampDone) {
              if (n >= cap) rampDone = true;
              else if (healthy && peak > 0 && left / peak > 30) {
                var add = Math.min(cap - n, Math.max(2, Math.ceil(n / 2)));
                before = { n: n, thr: peak }; adding = true;
                addPlayers(add).then(function () { adding = false; alive().forEach(assign); peak = 0; settleAt = Date.now() + 10000; rampAt = Date.now() + 18000; }, function () { adding = false; });
              } else rampAt = now + 3000;
            }
          }
        }
        // progress line + each player's state
        var pct = dur ? Math.min(1, doneLen / dur) : 0, spent = (now - began) / 1000, live = alive();
        mostPlayers = Math.max(mostPlayers, working().length);
        ui.status(label, title.slice(0, 26) + " · " + Math.floor(pct * 100) + "% · " + (two ? "바뀐 화면 약 " + count + "곳" : "사진 약 " + count + "장") + " · 플레이어 " + working().length + "개" + (adding ? "(늘리는 중)" : "") +
          " · 합계 약 " + (thr >= 10 ? Math.round(thr) : thr.toFixed(1)) + "배속 · 남은 시간 " + (pct > 0.02 && thr > 0.2 ? mins(left / thr) : "계산 중"));
        var per = live.map(function (P) { return P.seg ? (P.diag || (now - P.progAt < 3000 ? (P.rate || 0).toFixed(1) + "x" : "진행 없음")) : "대기"; }).join(" · ");
        if (stage && stage.ownerDocument) { var hdr = stage.ownerDocument.getElementById("lc-per"); if (hdr) hdr.textContent = "플레이어 " + live.length + "개 (" + (auto ? "자동" : "고정") + "): " + per; }
      }
      if (auto && best && !stopReq && !noRead) save(BKEY, best);
      // a whole video without the browser giving up: the limit learned from an earlier crash may go up by one again
      if (auto && safe && !everCrashed && !stopReq && !noRead && segs.length) save(SKEY, safe + 1);
      players.forEach(function (P) { if (P.alive) post(P, { type: "stop" }); delete waiters[P.key]; });
      closeStage();
      var findSecs = (Date.now() - began) / 1000, findLen = Math.max(0, dur - preDone);
      segs.forEach(function (sg) { if (!sg.done && !stopReq && dur - sg.start <= 8) { sg.done = true; sg.tail = true; } });
      var undone = segs.filter(function (sg) { return !sg.done; }).length;
      if (everMoved) embedsWorked = true;
      // the same pieces left over five times in a row: those really can't be read; finish without them
      var leftKey = String(Math.round(segs.filter(function (sg) { return !sg.done; }).reduce(function (a, sg) { return a + sg.end - sg.start; }, 0) / 5));
      res.same = undone && res.leftKey === leftKey ? (res.same || 0) + 1 : 0; res.leftKey = leftKey;
      if (!stopReq && !noRead && !badVideo && undone && (everMoved || preDone > 0 || embedsWorked) && res.same < 5) {
        // it was working and then YouTube stopped sending: keep what is done and come back to it later
        sessionCap = Math.max(2, Math.ceil(Math.max(1, mostPlayers) / 2));
        res.status = "wait"; res.why = summarize(errLog.slice(-6));
        res.msg = "유튜브가 영상을 보내 주지 않아 잠시 멈췄어요 (" + Math.round(100 * (1 - undone / Math.max(1, segs.length)) * (1 - preDone / Math.max(1, dur)) + 100 * preDone / Math.max(1, dur)) + "%까지 저장됨" + (res.why ? " · " + res.why : "") + ")";
        return "paused";
      }
      if (noRead) { res.status = "bad"; res.msg = "영상 화면을 읽지 못했어요(검은 화면만 보여요)"; return "noread"; }
      if (badVideo) { res.status = "bad"; res.msg = "화면을 읽을 수 없는 영상이에요(보호된 영상)"; return "fail"; }
      var lost = segs.filter(function (sg) { return !sg.done; });
      if (!stopReq && segs.length && lost.length === segs.length) {
        // nothing could be played at all here
        res.why = summarize(errLog);
        if (pip && usePip) { usePip = false; ui.status(label, "작업 창에서 재생되지 않아 이 탭에서 다시 시도해요. 이 탭을 화면에 띄워 두세요."); return runParts(id, label, res, { start: 2 }); }
        return "stuck";
      }
      var G = makeGeom(w, hgt);
      outs.sort(function (x, y) { return x.start - y.start; });
      var parts = outs.map(function (o) {
        var d = o.d;
        return { start: o.start, mask: d.mask, pctx: { ptr: d.ptr || null, tpl: d.tpl || null }, scenes: d.scenes.map(function (sc, q) { return { t: sc.t, ts: typeof sc.ts === "number" ? sc.ts : sc.t, sig: { g: sc.g, modes: new Int16Array(G.nb).fill(-1), blank: sc.blank }, blobP: two ? null : o.pics[q] }; }) };
      });
      var scenes = finalPass(G, parts);
      try { if (localStorage.getItem("lcDebug")) console.log("[lc] parts " + JSON.stringify(outs.map(function (o) { return [Math.round(o.start), o.d.scenes.map(function (x) { return Math.round(x.t * 10) / 10; })]; })) + " final " + JSON.stringify(scenes.map(function (x) { return Math.round(x.t); }))); } catch (e) {}
      var note = lost.length && !stopReq ? " · 읽지 못한 구간 " + lost.length + "곳" : "";
      if (stopReq && two) { res.status = "bad"; res.msg = "멈춤"; return "stopped"; }
      if (stopReq) {
        if (scenes.length) await saveZip(title + "_중단", scenes, 300);
        res.status = "bad"; res.msg = "멈춤" + (scenes.length ? " · 찍은 " + scenes.length + "장은 저장" : ""); return "stopped";
      }
      if (!scenes.length) {
        var sS = 0, sB = 0; players.forEach(function (P) { sS += P.samples || 0; sB += P.blanks || 0; });
        outs.forEach(function (o) { sS += o.d.samples || 0; sB += o.d.blanks || 0; });
        if (!sS && !stopReq) {
          // not one look was taken: the video did not really run. Try once more, then leave it for later.
          if (!opt.again) { ui.status(label, "화면을 한 번도 읽지 못해 다시 해요…"); await dbDelAll("seg:" + id + ":"); await bsleep(2000); return runParts(id, label, res, { again: true }); }
          res.status = "wait"; res.msg = "영상을 읽지 못했어요(화면 확인 0번)"; return "paused";
        }
        res.status = "bad"; res.msg = "찍힌 장면이 없어요 (화면 확인 " + sS + "번 중 빈 화면 " + sB + "번)"; return "fail";
      }
      if (two) {
        var miss = await takePhotos(id, label, title, scenes, G, mobile);
        if (stopReq) { res.status = "bad"; res.msg = "멈춤"; return "stopped"; }
        if (miss.gaveUp) {
          sessionCap = Math.max(2, Math.ceil(Math.max(1, mostPlayers) / 2));
          var have = scenes.filter(function (sc) { return sc.blobP; }).length;
          res.status = "wait"; res.why = miss.why;
          res.msg = "유튜브가 영상을 보내 주지 않아 사진 찍기를 잠시 멈췄어요 (" + have + " / " + scenes.length + "장 저장됨" + (miss.why ? " · " + miss.why : "") + ")";
          return "paused";
        }
        scenes = scenes.filter(function (sc) { return sc.blobP; });
        if (!scenes.length) { res.status = "bad"; res.msg = "사진을 찍지 못했어요" + (miss.why ? " (" + miss.why + ")" : ""); return "fail"; }
        if (miss.n) note += " · 찍지 못한 사진 " + miss.n + "장";
        var shotSecs = (Date.now() - began) / 1000 - findSecs;
        res.note = [miss.size, miss.lower ? "화질을 " + miss.lower + "로 낮춰 찍었어요" : "",
          "찾기 " + clock(findSecs) + (findSecs > 3 && findLen > 30 ? "(평균 " + (findLen / findSecs).toFixed(1) + "배속, 플레이어 최대 " + mostPlayers + "개)" : ""), "찍기 " + clock(shotSecs) + (miss.most ? "(플레이어 최대 " + miss.most + "개)" : "")].filter(Boolean).join(" · ");
      }
      ui.status(label, "ZIP 만드는 중…");
      var trn = res.subsP ? await Promise.race([res.subsP, bsleep(30000).then(function () { return null; })]) : null;
      if (!(trn && trn.ok) && prefs.subs !== false) trn = (preSubs[id] && preSubs[id].ok ? preSubs[id] : await dbGet("sub:" + id)) || trn;
      if (!(trn && trn.ok) && preSubs[id] && preSubs[id].why) trn = { ok: false, why: preSubs[id].why };
      var sv = await saveZip(title + (lost.length ? "_일부" : ""), scenes, 300, prefs.subs !== false ? { id: id, dur: dur, subs: trn } : null);
      res.handed = !!(sv && sv.handed); res.handWhy = sv && sv.why || "";
      res.subsInfo = trn && trn.ok ? "대본 " + trn.segs.length + "줄(" + trn.source + ")" : prefs.subs !== false ? "대본 없음" + (trn && trn.why ? "(" + String(trn.why).slice(0, 60) + ")" : "") : "";
      if (res.subsInfo) res.note = [res.note, res.subsInfo, res.handed ? "정리 노트로 보냄" : prefs.mode === "digest" ? "정리 노트 자동 전달 안 됨(" + (res.handWhy || "?") + ")" : ""].filter(Boolean).join(" · ");
      res.status = "done"; res.count = scenes.length; res.secs = (Date.now() - began) / 1000;
      if (sessionCap && !backoffs && !undone) sessionCap += 2;
      if (note) { res.status = "bad"; res.msg = "사진 " + scenes.length + "장 저장" + note + " (그 부분만 빠졌어요)"; }
      return "done";
    }
    // Second pass: the photos. A few players in the chosen quality go straight to each moment that is kept and send
    // its picture. Each picture is checked against what the first pass saw there (a clearly different screen is asked
    // for again a little later in the video), and saved on the device as it arrives.
    async function takePhotos(id, label, title, scenes, G, mobile) {
      var out = { n: 0, lower: "", why: "", px: 0, size: "", gaveUp: false }, todo = [], got = 0, total = scenes.length;
      for (var i = 0; i < scenes.length; i++) {
        var sc = scenes[i];
        sc.shotT = typeof sc.ts === "number" ? sc.ts : sc.t; sc.pk = "pic:" + id + ":" + String(Math.round(sc.shotT * 100)).padStart(8, "0");
        var old = await dbGet(sc.pk);
        if (old) { sc.blobP = Promise.resolve(old); got++; } else { sc.blobP = null; todo.push(i); }
      }
      if (!todo.length) return out;
      var qs = ["max", "hd2160", "hd1440", "hd1080", "hd720", "large"], names = { hd2160: "4K", hd1440: "1440p", hd1080: "1080p", hd720: "720p", large: "480p" };
      var q = prefs.quality || "hd1080", job = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      var queue = [], players = [], byKey = {}, nextK = 0, seqN = 1, crashes = 0, opens = 0, lastAny = Date.now(), empty = new Uint8Array(G.nb), errs = [];
      for (var c = 0; c < todo.length; c += 8) queue.push(todo.slice(c, c + 8));
      await openStage();
      function left(b) { return b.filter(function (k) { return !scenes[k].blobP && !scenes[k].gone; }); }
      function accept(scn, blob) { scn.blobP = copyPic(blob); got++; lastAny = Date.now(); scn.blobP.then(function (v) { dbPut(scn.pk, v); }); }
      function again(scn, blob) {
        // not the screen that was asked for, or no picture: ask once or twice more, slightly later; then take what there is
        scn.retry = (scn.retry || 0) + 1;
        if (blob) scn.spare = blob;
        if (scn.retry <= 2) { scn.shotT += 0.3; queue.push([scenes.indexOf(scn)]); }
        else if (scn.spare) accept(scn, scn.spare);
        else { scn.gone = true; out.n++; }
      }
      function onMsg(d) {
        var P = byKey[d.job]; if (!P || !P.alive) return;
        P.lastMsg = Date.now();
        if (d.type === "progress") { P.diag = d.err ? "유튜브 오류" : d.diag || ""; if (d.err && errs.indexOf("유튜브: " + String(d.err).slice(0, 60)) < 0) errs.push("유튜브: " + String(d.err).slice(0, 60)); if (d.diag === "광고") P.progAt = lastAny = Date.now(); return; }
        if (!P.batch || d.seq !== P.seq) return;
        if (d.type === "shot") {
          var scn = scenes[d.k]; if (d.ok && d.blob) P.progAt = Date.now();
          if (!scn || scn.blobP || scn.gone) return;
          if (!d.blob || !d.ok) return again(scn, null);
          var differs = false;
          try { if (d.g && scn.sig && d.g.length === scn.sig.g.length) differs = analyze(scn.sig, { g: d.g, modes: new Int16Array(G.nb).fill(-1), blank: d.blank }, G, empty).C > 0.04 * G.n; } catch (e) {}
          if (differs) again(scn, d.blob); else { accept(scn, d.blob); if (d.w && d.h && d.w * d.h > out.px) { out.px = d.w * d.h; out.size = d.w + "×" + d.h; } }
        } else if (d.type === "shots-done") { var rest = left(P.batch); P.batch = null; if (rest.length) rest.forEach(function (k) { again(scenes[k], null); }); give(P); }
      }
      function give(P) {
        if (!P.alive || P.batch || stopReq) return;
        var b = null; while (queue.length && !(b = left(queue.shift())).length) b = null;
        if (!b || !b.length) return;
        P.batch = b; P.seq = seqN++; P.progAt = Date.now(); P.diag = "";
        post(P, { type: "shots", seq: P.seq, times: b.map(function (k) { return scenes[k].shotT; }), keys: b, prefs: pickPrefs() });
      }
      function drop(P, why) { P.alive = false; delete waiters[P.key]; if (P.batch) { var rest = left(P.batch); if (rest.length) queue.unshift(rest); P.batch = null; } errs.push(why); post(P, { type: "stop" }); try { P.slot.remove(); } catch (e) {} }
      async function add(n) {
        var slots = []; for (var k = 0; k < n; k++) slots.push(stage.addSlot());
        var opened = await Promise.all(slots.map(function (slot) { return openPlayer(slot, id, job, nextK++, onMsg, q); }));
        opened.forEach(function (o, k) {
          if (o && !o.error) { o.slot = slots[k]; o.alive = true; o.batch = null; o.lastMsg = o.progAt = Date.now(); byKey[o.key] = o; players.push(o); }
          else { errs.push((o && o.error) || "error"); try { slots[k].remove(); } catch (e) {} }
        });
        players.forEach(give);
      }
      // How many photo players: start low (a full-quality player is heavy for a phone), then add one at a time while the
      // photos come in faster, and stop when they don't. 720p and below is light enough for more. The count that worked
      // is remembered for this device and quality class; a crash lowers it.
      var heavy = /^(max|hd2160|hd1440|hd1080)$/.test(q), cls = heavy ? "h" : "l", SHOTKEY = "lecture-capture-shots-v2";
      var memory = load(SHOTKEY, {}), lowMem = (navigator.deviceMemory || 8) <= 4;
      var capP = mobile ? (heavy ? (lowMem ? 3 : 4) : (lowMem ? 5 : 6)) : 8;
      var startP = memory[cls] || (mobile ? (heavy ? 2 : lowMem ? 3 : 4) : 4);
      var want = Math.max(1, Math.min(capP, startP, Math.ceil(todo.length / 8))), lastTick = Date.now();
      // (the speed is measured from 4 s after a player was added - it first has to load - over the next 10 s)
      var ramp = { on: true, baseAt: Date.now() + 4000, base: null, at: Date.now() + 14000, before: null, best: 0, adding: false };
      await add(want);
      while (!stopReq) {
        await bsleep(500);
        var now = Date.now();
        if (held() || now - lastTick > 6000) {
          while (held() && !stopReq) { ui.status(label, "이 화면이 가려져서 잠시 멈췄어요. 지금까지 한 것은 그대로 있어요. 이 화면으로 돌아오면 바로 이어서 해요."); await bsleep(1000); }
          now = Date.now(); players.forEach(function (P) { P.progAt = P.lastMsg = now + 8000; }); lastAny = now;
        }
        lastTick = now;
        // no photo at all for 90 seconds: YouTube is not sending. Stop here; the photos taken so far stay saved.
        if (now - lastAny > 90000) { out.gaveUp = true; out.why = summarize(errs.slice(-6)) || "사진이 오지 않음"; break; }
        var live = players.filter(function (P) { return P.alive; }), busy = live.filter(function (P) { return P.batch; });
        if (!busy.length && !queue.some(function (b) { return left(b).length; })) break;
        var dead = busy.filter(function (P) { return now - P.lastMsg > 8000; });
        if (dead.length) { crashes++; openEpoch++; live.forEach(function (P) { drop(P, "응답 없음"); }); }
        else busy.forEach(function (P) { if (now - P.progAt > 45000) drop(P, P.diag || "진행 없음"); });
        live = players.filter(function (P) { return P.alive; });
        live.forEach(give);
        if (!live.length) {
          if (++opens > 6) { out.gaveUp = true; out.why = summarize(errs.slice(-6)); break; }
          if (crashes >= 2 && qs.indexOf(q) >= 0 && qs.indexOf(q) < qs.length - 1) {
            // even a single player in this quality is too much for this device: take the photos one step lower
            q = qs[Math.max(qs.indexOf(q) + 1, qs.indexOf("hd1080"))] || "hd720"; if (qs.indexOf(q) < 0) q = "hd720";
            out.lower = names[q] || q; crashes = 1;
          }
          ui.status(label, crashes ? "사진 찍는 플레이어가 버티지 못해 " + (out.lower ? out.lower + " 화질, " : "") + "1개로 다시 해요…" : "사진 찍는 플레이어를 다시 여는 중…");
          await bsleep(1500);
          await add(1);
        }
        out.most = Math.max(out.most || 0, live.length);
        // more players while it pays (not after a crash, and only while there is enough left to share)
        if (ramp.on && !crashes && !ramp.adding && live.length && !ramp.base && now >= ramp.baseAt) ramp.base = { got: got, t: now };
        if (ramp.on && !crashes && !ramp.adding && live.length && ramp.base && now >= ramp.at) {
          var rate = (got - ramp.base.got) / Math.max(1, (now - ramp.base.t) / 1000), n = live.length, rest = total - got;
          // clearly slower with the last one added: that was one too many; otherwise keep adding while there is enough left
          if (ramp.before && rate < ramp.before.rate * 0.9) { ramp.on = false; ramp.best = ramp.before.n; }
          else if (n < capP && rest > n * 4) {
            ramp.before = { n: n, rate: rate }; ramp.best = n; ramp.adding = true;
            add(1).then(function () { ramp.adding = false; ramp.base = null; ramp.baseAt = Date.now() + 4000; ramp.at = Date.now() + 14000; }, function () { ramp.adding = false; ramp.on = false; });
          } else { ramp.on = false; ramp.best = n; }
        }
        ui.status(label, title.slice(0, 26) + " · 사진 찍는 중 " + got + " / " + total + "장 · 플레이어 " + live.length + "개" + (out.lower ? " (" + out.lower + ")" : ""));
        if (stage && stage.ownerDocument) { var hdr = stage.ownerDocument.getElementById("lc-per"); if (hdr) hdr.textContent = "사진 찍는 플레이어 " + live.length + "개: " + live.map(function (P) { return P.diag || (P.batch ? "찍는 중" : "대기"); }).join(" · "); }
      }
      players.forEach(function (P) { if (P.alive) { post(P, { type: "stop" }); } delete waiters[P.key]; });
      closeStage();
      // remember what this device managed: what paid off, or one less than what crashed
      try {
        if (crashes) memory[cls] = Math.max(1, Math.min(memory[cls] || capP, (out.most || 2) - 1));
        else if (ramp.best && !stopReq) memory[cls] = Math.max(ramp.best, Math.min(memory[cls] || 0, capP));
        save(SHOTKEY, memory);
      } catch (e) {}
      scenes.forEach(function (scn) { if (!scn.blobP && !scn.gone) { if (scn.spare) scn.blobP = copyPic(scn.spare); else out.n++; } });
      return out;
    }
    function clock(sec) { sec = Math.round(sec); return sec < 60 ? sec + "초" : Math.floor(sec / 60) + "분 " + (sec % 60) + "초"; }
    function summarize(list) {
      var c = {}; (list || []).forEach(function (x) { x = String(x || "?").slice(0, 40); c[x] = (c[x] || 0) + 1; });
      return Object.keys(c).map(function (k) { return k + (c[k] > 1 ? "×" + c[k] : ""); }).join(", ");
    }

    // Videos no player here could play: one YouTube tab goes through them on their own pages and saves each ZIP itself.
    // (YouTube cuts the link between that tab and this one, so this tab cannot follow it; it only hands the list over.)
    // Resolves with how many were handed over.
    function runSoloBatch(sids, sres) {
      return new Promise(function (resolve) {
        var payload = encodeURIComponent(JSON.stringify({ ids: sids, idx: 0, prefs: jobPrefs() }));
        var url = watchUrl(sids[0]) + "#lc-solo=" + payload;
        window.addEventListener("message", function (e) {
          // only arrives when the browser keeps the two tabs linked
          if (e.origin.indexOf(".youtube.com") < 0 || !e.data || e.data.lc !== 1 || e.data.type !== "solo-done") return;
          var k = sids.indexOf(e.data.id); if (k < 0) return;
          var r = sres[k]; r.title = e.data.title || r.title;
          if (e.data.ok) { r.status = "done"; r.count = e.data.count; r.secs = e.data.secs; } else { r.status = "bad"; r.msg = e.data.msg || "실패"; }
          showResults();
        });
        function handed() { sres.forEach(function (r) { r.status = "wait"; r.msg = "유튜브 탭에서 처리 중 · 끝나면 그 탭이 ZIP을 저장해요"; }); showResults(); resolve(sids.length); }
        if (window.open(url, "_blank")) return handed();
        // Chrome blocked the new tab because nobody clicked: one click on the button opens it
        running = false; refresh();
        $("go").textContent = "남은 영상 " + sids.length + "개 유튜브 탭에서 처리하기";
        ui.status("버튼을 한 번 눌러 주세요.", "남은 영상은 유튜브 탭에서 따로 처리해야 하는데, 브라우저가 새 탭을 막았어요.");
        var handler = function (ev) {
          ev.stopImmediatePropagation();
          $("go").removeEventListener("click", handler, true);
          running = true; refresh();
          if (window.open(url, "_blank")) return handed();
          sres.forEach(function (r) { r.status = "bad"; r.msg = "새 탭이 차단됐어요. 주소창에서 이 사이트의 팝업을 허용해 주세요"; }); showResults(); resolve(0);
        };
        $("go").addEventListener("click", handler, true);
      });
    }
  }

  // =====================================================================
  // ROLE: a YouTube page — the panel just hands the links to the work tab
  // =====================================================================
  function youtubeRole() {
    var solo = location.hash.match(/^#lc-solo=(.+)$/);
    if (solo) return soloRole(solo[1]);
    var ui = makePanel("'캡처 시작'을 누르면 작업 탭(GitHub 페이지)이 열리고 거기서 진행돼요. 그 탭을 화면에 띄워 두세요. 영상마다 ZIP이 다운로드 폴더에 저장돼요.",
      "'정리 자료 만들기'를 누르면 대본을 챙겨 작업 탭(GitHub 페이지)을 열어요. 폰은 바로 시작하고, PC는 거기서 한 번 더 누르면 돼요. 끝나면 정리 노트 페이지로 넘어가요.");
    var $ = ui.$;
    var id = parseId(location.href); if (id) $("links").value = watchUrl(id);
    // YouTube changes pages without reloading: keep the box in step with the video being watched
    var lastHref = location.href;
    setInterval(function () {
      if (location.href === lastHref) return; lastHref = location.href;
      var nid = parseId(location.href), cur = $("links").value.trim();
      if (nid && (!cur || (parseLinks(cur).ids.length === 1 && cur.indexOf("\n") < 0))) $("links").value = watchUrl(nid);
    }, 1000);

    // ---- the words of the video being watched (for writing it up later) ----
    var listening = false, stopListen = false;
    var sel = function (id2, opts) { var s2 = h("select", { id: id2 }); opts.forEach(function (o) { s2.appendChild(opt(o[0], o[1])); }); return s2; };
    var trBox = h("div", { class: "b digOnly", style: "border-top:1px solid var(--ln);padding-top:10px" }, [
      h("div", { style: "font-weight:700", text: "이 영상 대본 받기" }),
      h("div", { class: "r" }, [h("button", { id: "trGet", text: "대본 받기 (자막)" }), h("button", { id: "trListen", text: "소리로 받아쓰기", style: "background:var(--bg);color:var(--ac)" })]),
      h("div", { class: "r" }, [h("label", {}, ["받아쓰기 언어", sel("trLang", [["ko-KR", "한국어"], ["en-US", "영어"], ["ja-JP", "일본어"], ["zh-CN", "중국어"]])]),
        h("label", {}, ["받아쓰기 속도", sel("trRate", [["1", "1배 (가장 정확)"], ["1.25", "1.25배 (추천)"], ["1.5", "1.5배"]])])]),
      h("div", { class: "st", id: "trSt" }),
      h("a", { href: DIGEST_URL, target: "_blank", rel: "noopener", text: "영상 정리 노트 열기 →", style: "color:var(--ac);font-weight:700;text-decoration:none;font-size:12px" }),
      h("p", { class: "note", text: "이 영상 하나의 대본만 '제목_대본.txt'로 받아요(정리 자료 만들기에는 대본이 자동으로 들어가요). 자막이 없는 영상은 PC 크롬의 '소리로 받아쓰기'나 아래 LiveWiki로 받으세요." }),
      h("div", { id: "trLw" })
    ]);
    $("bd").appendChild(trBox); ui.applyMode();
    (function lwBtn() { var b = $("trLw"); b.textContent = ""; var vid = parseId(location.href); if (vid) b.appendChild(liveWikiButton(vid)); })();
    setInterval(function () { var b = $("trLw"), vid = parseId(location.href); if (vid && b.dataset.v !== vid) { b.dataset.v = vid; b.textContent = ""; b.appendChild(liveWikiButton(vid)); } }, 1500);
    $("trRate").value = "1.25";
    function trSt(t) { $("trSt").textContent = t; }
    function curMeta() {
      var mp = document.getElementById("movie_player"), v = document.querySelector("#movie_player video"), vid = parseId(location.href), title = "";
      try { title = (api(mp).getVideoData && api(mp).getVideoData().title) || ""; } catch (e) {}
      if (!title) title = document.title.replace(/^\(\d+\)\s*/, "").replace(/ - YouTube$/, "") || vid;
      return { mp: mp, video: v, id: vid, title: title, dur: v ? v.duration : 0 };
    }
    function saveTranscript(m, tr) {
      downloadBlob(new Blob([transcriptText(m, tr)], { type: "text/plain;charset=utf-8" }), safeName(m.title) + "_대본.txt");
    }
    if (!canListen()) { $("trListen").disabled = true; $("trListen").title = "PC 크롬 133 이상에서만 돼요"; }
    $("trGet").addEventListener("click", async function () {
      var m = curMeta(); if (!m.mp || !m.id) { trSt("영상 페이지에서 눌러 주세요."); return; }
      $("trGet").disabled = true; trSt("자막 찾는 중…");
      var tr = null; try { tr = await watchTranscript(m.id); } catch (e) { tr = { ok: false, why: String(e && e.message || e) }; }
      $("trGet").disabled = false;
      if (tr && tr.ok) { saveTranscript(m, tr); trSt("대본 " + tr.segs.length + "줄을 저장했어요 (" + tr.source + ", " + tr.name + ")."); return; }
      trSt("대본을 받지 못했어요" + (tr && tr.why ? " (" + tr.why + ")" : "") + ". " + (canListen() ? "자막이 없는 영상이면 '소리로 받아쓰기'를 눌러 주세요." : "자막이 없는 영상이면 PC 크롬의 '소리로 받아쓰기'를 쓰거나, 정리 노트에서 장면 사진만으로 정리하세요."));
    });
    $("trListen").addEventListener("click", async function () {
      if (listening) { stopListen = true; return; }
      var m = curMeta(); if (!m.video || !m.id) { trSt("영상 페이지에서 눌러 주세요."); return; }
      listening = true; stopListen = false; $("trListen").textContent = "받아쓰기 멈추기"; $("trGet").disabled = true;
      var rate = Number($("trRate").value) || 1.25, kept = load(listenKey(m.id), null);
      trSt(kept && kept.segs && kept.segs.length ? "지난번에 받아쓴 곳부터 이어서 해요…" : "처음부터 재생하며 받아써요. 소리를 끄지 마세요(탭 음소거는 괜찮아요).");
      var tr = await listen(m.video, m.id, { lang: $("trLang").value, rate: rate, stop: function () { return stopListen; } }, function (pct, n, quiet) {
        trSt("받아쓰는 중 " + Math.floor(pct * 100) + "% · " + n + "줄" + (quiet > 40 ? " · 40초 넘게 들린 말이 없어요(영상 소리가 꺼져 있지 않은지 확인)" : ""));
      });
      listening = false; $("trListen").textContent = "소리로 받아쓰기"; $("trGet").disabled = false;
      if (tr.why === "not-allowed") { trSt("브라우저가 음성 인식을 허용하지 않았어요. 주소창 왼쪽 아이콘에서 마이크를 '허용'으로 바꾸고 다시 눌러 주세요(마이크 소리는 쓰지 않아요)."); return; }
      if (tr.why === "language") { trSt("이 브라우저는 고른 언어의 받아쓰기를 지원하지 않아요."); return; }
      if (tr.why === "noaudio") { trSt("영상의 소리를 받을 수 없어요(소리가 없는 영상이거나 브라우저가 막았어요)."); return; }
      if (!tr.ok) { trSt(tr.why === "stopped" ? "멈췄어요. 받아쓴 말은 없어요." : "받아쓴 말이 없어요" + (tr.why ? " (" + tr.why + ")" : "") + "."); return; }
      saveTranscript(m, tr);
      if (tr.complete) { try { localStorage.removeItem(listenKey(m.id)); } catch (e) {} trSt("끝까지 받아써서 " + tr.segs.length + "줄을 저장했어요."); }
      else trSt("여기까지 " + tr.segs.length + "줄을 저장했어요. 다시 누르면 이어서 받아써요.");
    });
    // Transcripts are read here, on YouTube's own site (the work tab only has embedded players, which YouTube keeps
    // captions from). They start loading as soon as links are pasted, so most are ready when 시작 is pressed and
    // travel with the job itself; any still loading follow by message. (A phone may pause this tab once the work
    // tab is in front, so the more that travel with the job, the better.)
    var trCache = {};
    function prefetch(ids) {
      ids.slice(0, 20).forEach(function (id) {
        if (trCache[id]) return;
        var c = trCache[id] = { v: null };
        c.p = watchTranscript(id).catch(function (e) { return { ok: false, why: String(e && e.message || e) }; }).then(function (r) { c.v = r; return r; });
      });
    }
    var pfT = 0;
    $("links").addEventListener("input", function () { clearTimeout(pfT); pfT = setTimeout(function () { prefetch(parseLinks($("links").value).ids); }, 600); });
    $("go").addEventListener("click", async function () {
      ui.readPrefs(); savePrefs();
      var p = parseLinks($("links").value);
      if (!p.ids.length) { ui.status("유튜브 링크를 넣어 주세요.", p.bad ? "알아볼 수 없는 줄 " + p.bad + "개" : ""); return; }
      try { var own = document.querySelector("#movie_player video"); if (own) own.pause(); } catch (e) {}
      // wait a little for transcripts still loading (under 3 s, so the browser still counts the tap for opening a tab)
      prefetch(p.ids);
      var wait = p.ids.filter(function (id) { return trCache[id] && !trCache[id].v; });
      if (wait.length) { ui.status("대본 확인 중…", "곧 작업 탭이 열려요."); await Promise.race([Promise.all(wait.map(function (id) { return trCache[id].p; })), sleep(2800)]); }
      var subs = {}, size = 0;
      p.ids.forEach(function (id) { var v = trCache[id] && trCache[id].v; if (!v) return; var n = JSON.stringify(v).length; if (size + n < 300000) { subs[id] = v; size += n; } });
      var w = window.open(HOST_URL + "#lc=" + encodeURIComponent(JSON.stringify({ ids: p.ids, prefs: pickPrefs(), subs: subs })), "_blank");
      if (!w) { ui.status("새 탭이 차단됐어요.", "주소창 오른쪽의 팝업 차단 아이콘을 눌러 youtube.com의 팝업을 허용하고 다시 눌러 주세요."); return; }
      var got = p.ids.filter(function (id) { return subs[id] && subs[id].ok; }).length;
      ui.status("작업 탭에서 시작했어요.", "영상 " + p.ids.length + "개 · 대본 " + got + "개 함께 넘김 · 진행 상황은 새로 열린 탭의 패널에 나와요.");
      handOver(w, p.ids.filter(function (id) { return !subs[id]; }));   // the rest, when ready
    });
    async function handOver(w, ids) {
      for (var i = 0; i < ids.length; i++) {
        prefetch([ids[i]]);
        var tr = await trCache[ids[i]].p;
        ui.status("작업 탭에서 시작했어요.", "대본 " + (i + 1) + "/" + ids.length + ": " + (tr.ok ? tr.segs.length + "줄 넘김" : "못 찾음(" + tr.why + ")"));
        var acked = false, onAck = function (e) { if (e.origin === HOST_ORIGIN && e.data && e.data.lc === 1 && e.data.type === "subs-ack" && e.data.id === ids[i]) acked = true; };
        window.addEventListener("message", onAck);
        for (var k = 0; k < 40 && !acked; k++) { try { w.postMessage({ lc: 1, type: "subs-pre", id: ids[i], tr: tr }, HOST_ORIGIN); } catch (e) {} await sleep(500); }
        window.removeEventListener("message", onAck);
      }
    }
  }


  // Speech to text for a video without any captions: the video plays (it has to - this is listening, not downloading)
  // and the browser's own speech recognition writes down what it hears. Chrome on a computer only (version 133 on
  // accepts the video's sound instead of the microphone). What is written so far is kept, so it can carry on later.
  function canListen() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition, ua = navigator.userAgent || "";
    var cv = +((/Chrome\/(\d+)/.exec(ua) || [])[1] || 0);
    return !!SR && cv >= 133 && !/Android|Mobile|iPhone|iPad/i.test(ua) && !!HTMLMediaElement.prototype.captureStream;
  }
  function listenKey(id) { return "lc-asr-v1:" + id; }
  function listen(video, id, opt, onProgress) {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var kept = load(listenKey(id), null), segs = kept && kept.segs || [], from = kept && kept.pos || 0;
    var dur = video.duration || 0, done = false, rec = null, lineT = from, lastHeard = Date.now(), fails = 0, noTrack = 0;
    return new Promise(function (resolve) {
      function finish(why) {
        if (done) return; done = true; clearInterval(tick);
        try { rec && rec.abort(); } catch (e) {}
        try { video.pause(); video.playbackRate = 1; } catch (e) {}
        save(listenKey(id), { segs: segs, pos: video.currentTime || 0, at: Date.now() });
        resolve({ ok: segs.length > 0, why: why, source: "받아쓰기(브라우저 음성 인식)", lang: opt.lang, name: opt.lang, segs: segs, complete: why === "end" });
      }
      function track() { var st = video.captureStream(); return st.getAudioTracks()[0] || null; }
      function startRec() {
        if (done) return;
        var tk = track();
        if (!tk || tk.readyState !== "live") { if (++noTrack > 40 && (video.currentTime || 0) > lineT + 3) return finish("noaudio"); setTimeout(startRec, 500); return; }
        rec = new SR(); rec.lang = opt.lang || "ko-KR"; rec.continuous = true; rec.interimResults = false; rec.maxAlternatives = 1;
        rec.onresult = function (e) {
          for (var i = e.resultIndex; i < e.results.length; i++) {
            if (!e.results[i].isFinal) continue;
            var txt = (e.results[i][0].transcript || "").trim(), now = video.currentTime || 0;
            if (txt) { segs.push({ t: Math.round(lineT * 10) / 10, text: txt }); lastHeard = Date.now(); fails = 0; }
            lineT = now;
          }
          save(listenKey(id), { segs: segs, pos: lineT, at: Date.now() });
        };
        rec.onerror = function (e) {
          var er = e && e.error;
          if (er === "not-allowed" || er === "service-not-allowed") return finish("not-allowed");
          if (er === "language-not-supported") return finish("language");
          if (er === "network" && ++fails > 6) return finish("network");
        };
        rec.onend = function () { if (!done) setTimeout(startRec, 200); };
        try { rec.start(tk); } catch (e) { if (++fails > 6) return finish("start"); setTimeout(startRec, 800); }
      }
      if (from > 1 && from < dur - 2) { try { video.currentTime = Math.max(0, from - 1); } catch (e) {} } else if (!kept) { try { video.currentTime = 0; } catch (e) {} segs = []; }
      lineT = video.currentTime || 0;
      try { video.playbackRate = opt.rate || 1.25; var pp = video.play(); if (pp && pp.catch) pp.catch(function () {}); } catch (e) {}
      startRec();
      var tick = setInterval(function () {
        if (opt.stop && opt.stop()) return finish("stopped");
        if (video.ended || (dur && video.currentTime >= dur - 0.4)) return setTimeout(function () { finish("end"); }, 2500);
        if (video.paused) { try { video.play(); } catch (e) {} }
        if (Math.abs(video.playbackRate - (opt.rate || 1.25)) > 0.01) { try { video.playbackRate = opt.rate || 1.25; } catch (e) {} }
        onProgress && onProgress(dur ? video.currentTime / dur : 0, segs.length, (Date.now() - lastHeard) / 1000);
      }, 1000);
    });
  }

  // one video on its own watch page (opened by the work tab for videos that refuse embedding)
  function soloRole(raw) {
    var cfg = {}; try { cfg = JSON.parse(decodeURIComponent(raw)); } catch (e) {}
    Object.assign(prefs, cfg.prefs || {}); enterMode();
    var list = Array.isArray(cfg.ids) ? cfg.ids : [], at = Number(cfg.idx) || 0;
    function goNext() {
      if (at + 1 < list.length && !stopReq) {
        location.href = watchUrl(list[at + 1]) + "#lc-solo=" + encodeURIComponent(JSON.stringify({ ids: list, idx: at + 1, prefs: cfg.prefs || {} }));
      } else {
        ui.status("모두 끝났어요.", "ZIP은 다운로드 폴더에 있어요. 이 탭은 닫아도 돼요.");
        $("go").textContent = "끝"; $("go").disabled = true;
      }
    }
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    var ui = makePanel("이 탭이 남은 영상" + (list.length > 1 ? " " + list.length + "개" : "") + "를 하나씩 처리하고 영상마다 ZIP을 저장해요. 끝날 때까지 이 탭을 화면에 띄워 두세요.");
    var $ = ui.$, id = parseId(location.href), began = Date.now();
    $("links").value = watchUrl(id); $("go").textContent = "멈추기"; $("go").className = "stop";
    $("go").addEventListener("click", function () { stopReq = true; $("go").disabled = true; $("go").textContent = "멈추는 중…"; });
    window.addEventListener("message", function (e) { if (e.origin === HOST_ORIGIN && e.data && e.data.lc === 1 && e.data.type === "stop") stopReq = true; });
    function report(msg) { try { if (window.opener) window.opener.postMessage(Object.assign({ lc: 1, type: "solo-done", id: id }, msg), HOST_ORIGIN); } catch (e) {} goNext(); }
    function waitFor(fn, ms) {
      return new Promise(function (res) {
        var end = Date.now() + ms;
        (function poll() { var v = null; try { v = fn(); } catch (e) {} if (v) return res(v); if (Date.now() > end || stopReq) return res(null); setTimeout(poll, 250); })();
      });
    }
    (async function () {
      ui.status("준비 중", "영상을 불러오는 중…");
      var mp = await waitFor(function () { return document.getElementById("movie_player"); }, 30000);
      var video = await waitFor(function () { var v = document.querySelector("#movie_player video"); return v && v.readyState >= 1 ? v : null; }, 30000);
      if (!mp || !video) { ui.status("실패", "영상을 찾지 못했어요"); return report({ ok: false, msg: "영상을 찾지 못했어요" }); }
      var adWait = 0;
      while (isAd(mp) && !stopReq && adWait < 600) { ui.status("광고", "광고가 끝나길 기다리는 중…"); trySkipAd(document); await sleep(500); adWait++; }
      var err = playerError(document);
      if (err) { ui.status("실패", err); return report({ ok: false, msg: "유튜브에서 재생되지 않아요: " + err }); }
      setQuality(mp); video.muted = true;
      var title = ""; try { title = (api(mp).getVideoData && api(mp).getVideoData().title) || ""; } catch (e) {}
      if (!title) title = document.title.replace(/^\(\d+\)\s*/, "").replace(/ - YouTube$/, "") || id;
      var vw = await waitFor(function () { return video.videoWidth; }, 15000);
      if (!vw) return report({ ok: false, msg: "화면 크기를 읽지 못했어요" });
      var dur = video.duration || (api(mp).getDuration ? api(mp).getDuration() : 0) || 0;
      var G = makeGeom(vw, video.videoHeight), full = document.createElement("canvas"), fctx = full.getContext("2d");
      var C = makeCapturer(G, video, full, fctx), P = { video: video, mp: mp, doc: document };
      var show = setInterval(function () {
        var pct = dur ? (P.pos || 0) / dur : 0, spent = (Date.now() - began) / 1000;
        ui.status("처리 중", title.slice(0, 26) + " · " + Math.floor(pct * 100) + "% · 사진 약 " + C.scenes.length + "장 · 남은 시간 " + (pct > 0.02 ? mins(spent / pct * (1 - pct)) : "계산 중"));
      }, 1000);
      await playPart(P, 0, dur, C);
      clearInterval(show);
      try { video.playbackRate = 1; } catch (e) {}
      if (C.bad) return report({ ok: false, title: title, msg: "화면을 읽을 수 없는 영상이에요(보호된 영상)" });
      var scenes = finalPass(G, [C]);
      if (!scenes.length) return report({ ok: false, title: title, msg: "찍힌 장면이 없어요" });
      ui.status("저장 중", "대본 찾는 중…");
      var trn = prefs.subs !== false ? await watchTranscript(id).catch(function () { return null; }) : null;
      ui.status("저장 중", "ZIP 만드는 중…");
      await saveZip(title + (stopReq ? "_중단" : ""), scenes, null, prefs.subs !== false ? { id: id, dur: dur, subs: trn } : null);
      ui.status("끝났어요.", "사진 " + scenes.length + "장을 저장했어요.");
      report({ ok: !stopReq, title: title, count: scenes.length, secs: (Date.now() - began) / 1000, msg: stopReq ? "멈춤 · 찍은 " + scenes.length + "장은 저장" : "" });
    })();
  }

  // =====================================================================
  // ROLE: livewiki.com — its script (written even for videos without captions) saved as "제목_대본.txt"
  // =====================================================================
  function livewikiRole() {
    var SKEY2 = "lc-lw-yt", m = /#lc-yt=([\w-]{11})/.exec(location.hash);
    if (m) { try { sessionStorage.setItem(SKEY2, m[1]); history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }
    var want = null; try { want = sessionStorage.getItem(SKEY2); } catch (e) {}
    var host = document.createElement("div"), root = host.attachShadow({ mode: "open" }), st = document.createElement("style");
    st.textContent = CSS + ".p{top:auto;bottom:16px;width:280px}";
    root.appendChild(st);
    var box = h("div", { class: "p" }, [h("div", { class: "h" }, [h("span", { text: "강의 캡처 · LiveWiki 대본" })]),
      h("div", { class: "b" }, [h("div", { class: "st", id: "lwSt", text: "LiveWiki에서 영상을 요약하면 스크립트를 대본 파일로 저장해요." }), h("button", { id: "lwSave", text: "지금 대본 저장" })])]);
    root.appendChild(box);
    (function mount() { if (!host.isConnected && document.body) document.body.appendChild(host); setTimeout(mount, 2000); })();
    function say(t) { root.getElementById("lwSt").textContent = t; }
    function visible(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }
    // 1) the address of the video goes into LiveWiki's box (the button there is left to the user)
    var filled = false;
    function fill() {
      if (filled || !want) return;
      var inp = Array.prototype.slice.call(document.querySelectorAll("input, textarea")).filter(function (x) {
        return visible(x) && !x.disabled && (x.type === "url" || /youtube|유튜브|링크|url|주소|붙여/i.test((x.placeholder || "") + " " + (x.getAttribute("aria-label") || "") + " " + (x.name || "")));
      })[0];
      if (!inp) return;
      var proto = inp.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      try { Object.getOwnPropertyDescriptor(proto, "value").set.call(inp, watchUrl(want)); } catch (e) { inp.value = watchUrl(want); }
      inp.dispatchEvent(new Event("input", { bubbles: true })); inp.dispatchEvent(new Event("change", { bubbles: true }));
      try { inp.focus(); } catch (e) {}
      filled = true; say("유튜브 주소를 넣어 뒀어요. LiveWiki의 요약 버튼을 눌러 주세요. 요약이 나오면 대본을 저장해요.");
    }
    function videoId() {
      var id = parseId(location.href);
      if (!id) { var a = document.querySelector("a[href*='youtube.com/watch'], a[href*='youtu.be/'], iframe[src*='youtube.com/embed'], iframe[src*='youtube-nocookie.com/embed']"); if (a) id = parseId(a.href || a.src); }
      if (!id) { var im = document.querySelector("img[src*='ytimg.com/vi/']"); var mm = im && /\/vi\/([\w-]{11})\//.exec(im.src); if (mm) id = mm[1]; }
      return id || want;
    }
    function title() {
      var t = document.querySelector("h1"), s = t && t.textContent.trim();
      return s || document.title.replace(/\s*[|·-]\s*LiveWiki.*$/i, "").trim() || "LiveWiki";
    }
    // 2) its "스크립트" tab, opened once per video
    var clickedFor = "";
    function openScript(key) {
      if (clickedFor === key) return;
      var tabs = Array.prototype.slice.call(document.querySelectorAll("button, [role=tab], a, li, div, span")).filter(function (x) {
        return visible(x) && x.children.length <= 2 && /^(스크립트|script|transcript)$/i.test((x.textContent || "").trim());
      });
      if (tabs.length) { clickedFor = key; try { tabs[0].click(); } catch (e) {} }
    }
    function readScript() {
      var txt = ""; try { txt = document.body.innerText; } catch (e) {}
      return parseTimed(txt);
    }
    function save(segs, id, auto) {
      var head = ["제목: " + title(), id ? "주소: " + watchUrl(id) : "", "대본: LiveWiki 스크립트", "-----"].filter(Boolean);
      var body = head.concat(segs.map(function (x) { return "[" + clockT(x.t) + "] " + x.text; })).join("\n") + "\n";
      downloadBlob(new Blob([body], { type: "text/plain;charset=utf-8" }), safeName(title()) + "_대본.txt");
      try { sessionStorage.setItem("lc-lw-saved:" + (id || title()), String(segs.length)); } catch (e) {}
      say((auto ? "대본을 저장했어요: " : "저장했어요: ") + segs.length + "줄. 정리 노트로 보내는 중…");
      bridgePut({ kind: "txt", name: safeName(title()) + "_대본.txt", id: id || "", title: title(), words: true }, new Blob([body], { type: "text/plain;charset=utf-8" })).then(function (ok) {
        if (!ok) { say("대본을 저장했어요: " + segs.length + "줄. 정리 노트 페이지에서 정리자료 ZIP과 이 파일을 함께 고르세요."); return; }
        var left = 6, stay = false, sb = h("button", { text: "여기 머무르기", style: "background:var(--bg);color:var(--ac)" });
        root.querySelector(".b").appendChild(sb);
        sb.addEventListener("click", function () { stay = true; sb.remove(); say("정리 노트로 보냈어요. 정리 노트 페이지를 열면 바로 정리돼요."); });
        (function tick() { if (stay) return; if (left <= 0) { location.href = DIGEST_URL; return; } say("정리 노트로 보냈어요(" + segs.length + "줄). " + left + "초 뒤 정리 노트 페이지로 넘어가요."); left--; setTimeout(tick, 1000); })();
      });
    }
    root.getElementById("lwSave").addEventListener("click", function () {
      var sg = readScript(); if (sg.length < 3) { say("화면에서 스크립트를 찾지 못했어요. LiveWiki의 '스크립트' 탭을 열고 다시 눌러 주세요."); return; }
      save(sg, videoId(), false);
    });
    // 3) once the script stays the same for a few seconds, it is saved (once per video)
    var lastN = -1, sameFor = 0;
    setInterval(function () {
      fill();
      var id = videoId(), key = id || location.pathname;
      if (readScript().length >= 3) openScript(key);   // a summary is up: switch to its script (not the timeline) first
      var sg = readScript();
      if (sg.length < 10) { lastN = sg.length; sameFor = 0; return; }
      if (sg.length === lastN) sameFor++; else { sameFor = 0; lastN = sg.length; say("스크립트 읽는 중… " + sg.length + "줄"); }
      var done = null; try { done = sessionStorage.getItem("lc-lw-saved:" + (id || title())); } catch (e) {}
      if (sameFor >= 3 && !done) save(sg, id, true);
    }, 1500);
  }

  // ---------- pick the role ----------
  var inFrame = false; try { inFrame = window.top !== window; } catch (e) { inFrame = true; }
  if (location.origin === YT_ORIGIN && /^\/embed\//.test(location.pathname)) { if (inFrame) workerRole(); }
  else if (location.origin === YT_ORIGIN || location.origin === YT_MOBILE) { if (!inFrame) youtubeRole(); }
  else if (location.origin === HOST_ORIGIN) { if (!inFrame) hostRole(); }
  else if (/(^|\.)livewiki\.com$/.test(location.hostname)) { if (!inFrame) livewikiRole(); }
})();
