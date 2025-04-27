// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4rkIz":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8lqZg":[function(require,module,exports) {
"use strict";
var _game = require("4bc63ce8d1866791");
var canvas = document.getElementById("cnvs");
canvas.width = 600;
canvas.height = window.innerHeight;
var tickLength = 15; //ms
var lastTick;
var lastRender;
var stopCycle;
function run(tFrame) {
    stopCycle = window.requestAnimationFrame(run);
    var nextTick = lastTick + tickLength;
    var numTicks = 0;
    if (tFrame > nextTick) {
        var timeSinceTick = tFrame - lastTick;
        numTicks = Math.floor(timeSinceTick / tickLength);
    }
    for(var i = 0; i < numTicks; i++){
        lastTick = lastTick + tickLength;
        (0, _game.update)(lastTick, stopGame);
    }
    (0, _game.draw)(canvas, tFrame);
    lastRender = tFrame;
}
function stopGame(score) {
    alert("\u043D\u0435 \u0432 \u044D\u0442\u043E\u0442 \u0440\u0430\u0437. \u0421\u0447\u0435\u0442 ".concat(score));
    window.cancelAnimationFrame(stopCycle);
}
function onPreloadComplete() {
    lastTick = performance.now();
    lastRender = lastTick;
    stopCycle = null;
    (0, _game.init)(canvas, lastRender);
    run();
}
(0, _game.preload)(onPreloadComplete);

},{"4bc63ce8d1866791":"g9e9u"}],"g9e9u":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.draw = draw;
exports.init = init;
exports.preload = preload;
exports.update = update;
var _sprite = _interopRequireDefault(require("1ef4dcbaf5c4be19"));
var _cannon = _interopRequireDefault(require("2f04134a421d6bb"));
var _bullet = _interopRequireDefault(require("c8bd1e31db3a602e"));
var _bunker = _interopRequireDefault(require("f294260b5214e85c"));
var _alienClasses = require("10d8c36872d64245");
var _eventBus = _interopRequireDefault(require("bf1810ec97647838"));
var _constants = require("61c8ecf0f2bc3331");
var _inputHandler = _interopRequireDefault(require("49c5aa2f94df971b"));
var _invaders = _interopRequireDefault(require("e05408034288f441"));
var _bonus = _interopRequireDefault(require("c88d5862196cd76d"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var assets;
var sprites = {
    aliens: [],
    cannon: null,
    bunker: null
};
var gameState = {
    startTime: 0,
    currentScore: 0,
    bullets: [],
    aliens: [],
    bonuses: [],
    cannon: null,
    bunkers: [],
    canvas: null,
    nextShootAllowed: 0,
    lives: _constants.PLAYER_LIVES,
    playerBuffUntil: 0,
    alienBuffUntil: 0,
    alienSpeedBuffUntil: 0,
    killCount: 0,
    nextBonusAt: 0,
    gameStopped: false
};
var inputHandler = new _inputHandler["default"]();
function preload(onPreloadComplete) {
    assets = new Image();
    assets.addEventListener("load", function() {
        sprites.cannon = new _sprite["default"](assets, 62, 0, 22, 16);
        sprites.bunker = new _sprite["default"](assets, 84, 8, 36, 24);
        sprites.aliens = [
            [
                new _sprite["default"](assets, 0, 0, 22, 16),
                new _sprite["default"](assets, 0, 16, 22, 16)
            ],
            [
                new _sprite["default"](assets, 22, 0, 16, 16),
                new _sprite["default"](assets, 22, 16, 16, 16)
            ],
            [
                new _sprite["default"](assets, 38, 0, 24, 16),
                new _sprite["default"](assets, 38, 16, 24, 16)
            ]
        ];
        onPreloadComplete();
    });
    assets.src = _invaders["default"];
}
function init(canvas, time) {
    gameState.startTime = time;
    gameState.eventBus = new _eventBus["default"]();
    var alienRows = [
        _alienClasses.BottomShooterAlien,
        _alienClasses.RapidFireAlien,
        _alienClasses.BottomShooterAlien,
        _alienClasses.RapidFireAlien,
        _alienClasses.BottomShooterAlien,
        _alienClasses.RapidFireAlien
    ];
    alienRows.forEach(function(Cls, i) {
        for(var j = 0; j < 10; j++){
            var x = canvas.width / 10 * j + (Cls === _alienClasses.RapidFireAlien ? 3 : 0);
            var y = 40 + i * 40;
            gameState.aliens.push(new Cls(x, y, sprites.aliens[i % sprites.aliens.length]));
        }
    });
    for(var i = 0; i < 5; i++){
        var alienX = canvas.width / 5 * i;
        var alienY = canvas.height - 150;
        gameState.bunkers.push(new _bunker["default"](alienX, alienY, sprites.bunker));
    }
    gameState.cannon = new _cannon["default"](100, canvas.height - 100, sprites.cannon);
    gameState.canvas = canvas;
}
function update(time, stopGame) {
    /* ───── 1. УПРАВЛЕНИЕ ИГРОКА ───── */ if (inputHandler.isDown("ArrowLeft")) gameState.cannon.x -= 4;
    if (inputHandler.isDown("ArrowRight")) gameState.cannon.x += 4;
    var maxX = gameState.canvas.width - gameState.cannon.w;
    if (gameState.cannon.x < 0) gameState.cannon.x = 0;
    if (gameState.cannon.x > maxX) gameState.cannon.x = maxX;
    var shootCd = time < gameState.playerBuffUntil ? _constants.SHOOT_COOLDOWN / 2 : _constants.SHOOT_COOLDOWN;
    if (inputHandler.isDown("Space") && time >= gameState.nextShootAllowed) {
        var bx = gameState.cannon.x + (gameState.cannon.w >> 1) - 1;
        var by = gameState.cannon.y;
        if (time < gameState.playerBuffUntil) gameState.bullets.push(new _bullet["default"](bx, by, _constants.PLAYER_BONUS_BULLET_SPEED, 2, 6, "#e048ff", "player"));
        else gameState.bullets.push(new _bullet["default"](bx, by, _constants.PLAYER_BULLET_SPEED, 2, 6, "#fff", "player"));
        gameState.nextShootAllowed = time + shootCd;
    }
    if (time >= gameState.nextBonusAt) {
        var x = Math.random() * (gameState.canvas.width - 18);
        gameState.bonuses.push(new _bonus["default"](x, gameState.canvas.height * 2 / 3, time + _constants.BONUS_TIME_TO_LIVE));
        gameState.nextBonusAt = time + _constants.BONUS_SPAWN_EVERY;
    }
    gameState.bonuses.forEach(function(b) {
        return b.update(time);
    });
    /* ───── 2. ДВИЖЕНИЕ ПРИШЕЛЬЦЕВ ───── */ var speedMul = time < gameState.alienSpeedBuffUntil ? 2 : 1;
    gameState.aliens.forEach(function(al) {
        al._lowerMate = gameState.aliens.some(function(o) {
            return o !== al && Math.abs(o.x - al.x) < al.w && o.y > al.y;
        });
        al.move(gameState.canvas, speedMul);
    });
    /* ─── 2‑бис. СТОЛКНОВЕНИЯ АЛИЕН↔АЛИЕН ─── */ for(var i = 0; i < gameState.aliens.length; i++){
        var a = gameState.aliens[i];
        for(var j = i + 1; j < gameState.aliens.length; j++){
            var b = gameState.aliens[j];
            if (!a.isDead && !b.isDead && isColliding(a, b)) {
                a.dir *= -1;
                b.dir *= -1;
            }
        }
    }
    /* ───── 3. ИНДИВИДУАЛЬНАЯ СТРЕЛЬБА ───── */ gameState.aliens.forEach(function(al) {
        return al.shoot(gameState, time);
    });
    /* ───── 4. ОБНОВЛЯЕМ ПУЛИ ───── */ gameState.bullets.forEach(function(b) {
        return b.update(gameState.canvas);
    });
    /* ───── 5. СТОЛКНОВЕНИЯ ПУЛЬ ───── */ gameState.bullets.forEach(function(bullet) {
        /* игрок -> пришельцы */ if (bullet.owner === "player") gameState.aliens.forEach(function(alien) {
            if (!alien.isDead && bulletHits(bullet, alien)) {
                alien.dead(time, gameState);
                bullet.isDead = true;
            }
        });
        /*  ПУЛЯ ПРИШЕЛЬЦА -> ПРИШЕЛЕЦ  */ if (bullet.owner === "alien") //желтые пули будут без ff
        gameState.aliens.forEach(function(alien) {
            if (!alien.isDead && bulletHits(bullet, alien)) {
                alien.dead(time, gameState); // пришелец погибает
                bullet.isDead = true; // пуля тоже исчезает
            }
        });
        /* любая пуля -> бункеры */ gameState.bunkers.forEach(function(bunker) {
            if (!bunker.isDead && bulletHits(bullet, bunker)) {
                bunker.hit(bullet.owner);
                bullet.isDead = true;
            }
        });
        gameState.bonuses.forEach(function(bonus) {
            if (!bonus.isDead && bulletHits(bullet, bonus)) {
                bonus.isDead = true;
                if (bullet.owner === "player") // игрок попал
                gameState.playerBuffUntil = time + _constants.BONUS_PLAYER_MS;
                else // пришелец попал
                gameState.alienBuffUntil = gameState.alienSpeedBuffUntil = time + _constants.BONUS_ALIENS_MS;
                bullet.isDead = true;
            }
        });
        /* пришелец -> игрок */ if (bullet.owner !== "player" && bulletHits(bullet, gameState.cannon)) {
            gameState.lives--;
            bullet.isDead = true;
            gameState.bullets = [];
            gameState.bonuses = [];
            gameState.currentScore -= _constants.DEATH_PRICE;
            if (gameState.lives <= 0) stopGame === null || stopGame === void 0 || stopGame(gameState.currentScore);
        }
    });
    /* ───── 6. УДАЛЯЕМ МЁРТВЫХ ───── */ gameState.bullets = gameState.bullets.filter(function(b) {
        return !b.isDead;
    });
    gameState.aliens = gameState.aliens.filter(function(a) {
        return !a.isDead;
    });
    gameState.bunkers = gameState.bunkers.filter(function(b) {
        return !b.isDead;
    });
    gameState.bonuses = gameState.bonuses.filter(function(b) {
        return !b.isDead;
    });
    if (gameState.aliens.length == 0 && !gameState.gameStopped) {
        gameState.gameStopped = true;
        // window.open("https://www.youtube.com/watch?v=ecI1XvAGd5c", '_blank').focus();
        alert("\u0423\u0440\u0430 \u043F\u043E\u0431\u0435\u0434\u0430, \u0432\u044B \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 ".concat(gameState.currentScore));
    }
}
function draw(canvas, time) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < gameState.lives; i++){
        var dx = 4 + i * 16;
        var dy = gameState.canvas.height - 20;
        ctx.drawImage(sprites.cannon.img, sprites.cannon.x, sprites.cannon.y, sprites.cannon.w, sprites.cannon.h, dx, dy, 14, 10); // мини-вариант спрайта
    }
    gameState.bonuses.forEach(function(b) {
        return b.draw(ctx, time);
    });
    gameState.bunkers.forEach(function(a) {
        return a.draw(ctx, time);
    });
    gameState.aliens.forEach(function(a) {
        return a.draw(ctx, time);
    });
    gameState.cannon.draw(ctx);
    gameState.bullets.forEach(function(b) {
        return b.draw(ctx);
    });
}
function isColliding(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function sweptCollide(bullet, target) {
    // 1) объединим позиции пули за два кадра
    var left = Math.min(bullet.x, bullet.prevX);
    var right = Math.max(bullet.x + bullet.w, bullet.prevX + bullet.w);
    var top = Math.min(bullet.y, bullet.prevY);
    var bottom = Math.max(bullet.y + bullet.h, bullet.prevY + bullet.h);
    // 2) прямоугольники пересекаются?
    return left < target.x + target.w && right > target.x && top < target.y + target.h && bottom > target.y;
}
function bulletHits(bullet, target) {
    return isColliding(bullet, target) || sweptCollide(bullet, target);
}

},{"1ef4dcbaf5c4be19":"gVxQ7","2f04134a421d6bb":"91gH2","c8bd1e31db3a602e":"MfC6o","49c5aa2f94df971b":"jTTaN","e05408034288f441":"iQfac","f294260b5214e85c":"jec18","10d8c36872d64245":"gp1SR","bf1810ec97647838":"csRs5","61c8ecf0f2bc3331":"3huJa","c88d5862196cd76d":"4uqak"}],"gVxQ7":[function(require,module,exports) {
"use strict";
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
var Sprite = exports["default"] = /*#__PURE__*/ _createClass(function Sprite(img, x, y, w, h) {
    _classCallCheck(this, Sprite);
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
});

},{}],"91gH2":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var Cannon = exports["default"] = /*#__PURE__*/ function() {
    function Cannon(x, y, sprite) {
        _classCallCheck(this, Cannon);
        this.x = x;
        this.y = y;
        this.w = sprite.w;
        this.h = sprite.h;
        this._sprite = sprite;
    }
    _createClass(Cannon, [
        {
            key: "draw",
            value: function draw(ctx, time) {
                ctx.drawImage(this._sprite.img, this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h, this.x, this.y, this._sprite.w, this._sprite.h);
            }
        }
    ]);
    return Cannon;
}();

},{}],"MfC6o":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var Bullet = exports["default"] = /*#__PURE__*/ function() {
    function Bullet(x, y, vy, w, h, color, owner) {
        _classCallCheck(this, Bullet);
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.prevX = x;
        this.prevY = y;
        this.color = color;
        this.owner = owner;
        this.isDead = false;
    }
    _createClass(Bullet, [
        {
            key: "update",
            value: function update(canvas) {
                this.prevX = this.x;
                this.prevY = this.y;
                this.y += this.vy;
                // уходит за экран – помечаем на удаление
                if (this.y + this.h < 0 || this.y > canvas.height) this.isDead = true;
            }
        },
        {
            key: "draw",
            value: function draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
    ]);
    return Bullet;
}();

},{}],"jTTaN":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var InputHandler = exports["default"] = /*#__PURE__*/ function() {
    function InputHandler() {
        var _this = this;
        _classCallCheck(this, InputHandler);
        this.down = {};
        this.pressed = {};
        document.addEventListener("keydown", function(e) {
            _this.down[e.code] = true;
        });
        document.addEventListener("keyup", function(e) {
            delete _this.down[e.code];
            delete _this.pressed[e.code];
        });
    }
    /**
   * Returns whether a key is pressed down
   * @param  {String} code the keycode to check
   * @return {boolean} the result from check
   */ _createClass(InputHandler, [
        {
            key: "isDown",
            value: function isDown(code) {
                return this.down[code];
            }
        },
        {
            key: "isPressed",
            value: function isPressed(code) {
                // if key is registered as pressed return false else if
                // key down for first time return true else return false
                if (this.pressed[code]) return false;
                else if (this.down[code]) return this.pressed[code] = true;
                return false;
            }
        }
    ]);
    return InputHandler;
}();

},{}],"iQfac":[function(require,module,exports) {
module.exports = require("fe47d5c7b9d66484").getBundleURL("bLxZJ") + "invaders.363eab31.png" + "?" + Date.now();

},{"fe47d5c7b9d66484":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"jec18":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var MAX_HP = 5;
var Bunker = exports["default"] = /*#__PURE__*/ function() {
    function Bunker(x, y, sprite) {
        _classCallCheck(this, Bunker);
        this.x = x;
        this.y = y;
        this._sprite = sprite;
        this.w = sprite.w;
        this.h = sprite.h;
        this.hp = MAX_HP;
        this.isDead = false;
    }
    _createClass(Bunker, [
        {
            key: "hit",
            value: function hit(by) {
                if (by === "player") return; // игнорируем «дружественный огонь»
                this.hp--;
                if (this.hp <= 0) this.isDead = true;
            }
        },
        {
            key: "draw",
            value: function draw(ctx, time) {
                ctx.drawImage(this._sprite.img, this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h, this.x, this.y, this._sprite.w, this._sprite.h);
            }
        }
    ]);
    return Bunker;
}();

},{}],"gp1SR":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RapidFireAlien = exports.BottomShooterAlien = exports.AlienBase = void 0;
var _bullet = _interopRequireDefault(require("9d87459a3f727e8e"));
var _constants = require("398fd525f28ac7cb");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
    else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/* ===== базовый инопланетянин ===== */ var AlienBase = exports.AlienBase = /*#__PURE__*/ function() {
    function AlienBase(x, y, _ref) {
        var _ref2 = _slicedToArray(_ref, 2), spriteA = _ref2[0], spriteB = _ref2[1];
        _classCallCheck(this, AlienBase);
        this.x = x;
        this.y = y;
        this._spriteA = spriteA;
        this._spriteB = spriteB;
        this.w = spriteA.w;
        this.h = spriteA.h;
        this.dir = Math.random() < .5 ? 1 : -1;
        this.edgeHits = 0;
        this.shootDelay = 3000 + Math.random() * 3000;
        this.nextShoot = 0;
        this.isDead = false;
    }
    /* ─ движения, развороты, спуск после 3‑го касания ─ */ _createClass(AlienBase, [
        {
            key: "move",
            value: function move(canvas) {
                var speedMul = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
                this.x += _constants.ALIEN_HORZ_SPEED * speedMul * this.dir;
                var hitL = this.dir === -1 && this.x <= 0;
                var hitR = this.dir === 1 && this.x + this.w >= canvas.width;
                if (hitL || hitR) {
                    this.dir *= -1;
                    this.edgeHits++;
                    this.x = Math.max(0, Math.min(this.x, canvas.width - this.w));
                }
                if (this.edgeHits >= _constants.ALIEN_REFLECT_TIMES && this.canDescend()) {
                    this.y += _constants.ALIEN_DESCENT;
                    this.edgeHits = 0;
                }
            }
        },
        {
            key: "canDescend",
            value: function canDescend() {
                return true;
            } // уточняют наследники
        },
        {
            key: "draw",
            value: function draw(ctx, time) {
                var sp = Math.ceil(time / 1000) % 2 ? this._spriteA : this._spriteB;
                ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, this.x, this.y, sp.w, sp.h);
            }
        },
        {
            key: "shoot",
            value: function shoot(gameState, time) {}
        },
        {
            key: "effectiveDelay",
            value: function effectiveDelay(time, base, gameState) {
                // вызываем из потомков
                return time < gameState.alienBuffUntil ? base / 1.5 : base;
            }
        },
        {
            key: "dead",
            value: function dead(time, gameState) {
                gameState.currentScore += _constants.ALIEN_PRICE;
                this.isDead = true;
                gameState.killCount++;
                if (gameState.killCount % _constants.KILL_STREAK === 0) gameState.alienBuffUntil = gameState.alienSpeedBuffUntil = time + _constants.STREAK_BUFF_MS;
            }
        }
    ]);
    return AlienBase;
}();
/* === класс: BottomShooter – стреляет только снизу колонки === */ var BottomShooterAlien = exports.BottomShooterAlien = /*#__PURE__*/ function(_AlienBase) {
    _inherits(BottomShooterAlien, _AlienBase);
    function BottomShooterAlien() {
        _classCallCheck(this, BottomShooterAlien);
        return _callSuper(this, BottomShooterAlien, arguments);
    }
    _createClass(BottomShooterAlien, [
        {
            key: "canDescend",
            value: function canDescend() {
                return !this._lowerMate; // see setter in update loop
            }
        },
        {
            key: "shoot",
            value: function shoot(gameState, time) {
                var _this = this;
                if (time < this.nextShoot || this._lowerMate) return;
                // цель под пришельцем: пушка ИЛИ бонус
                var cx = this.x + (this.w >> 1);
                var targetBelow = function targetBelow(obj) {
                    return Math.abs(obj.x + (obj.w >> 1) - cx) <= 20 && obj.y > _this.y;
                };
                var hasTarget = targetBelow(gameState.cannon) || gameState.bonuses.some(targetBelow);
                if (!hasTarget) return;
                if (gameState.playerBuffUntil > time) gameState.bullets.push(new _bullet["default"](this.x + (this.w >> 1) - 1, this.y + this.h, _constants.BOTTOM_BULLET_SPEED * 2, 2, 6, "#00fff7", "alien"));
                else gameState.bullets.push(new _bullet["default"](this.x + (this.w >> 1) - 1, this.y + this.h, _constants.BOTTOM_BULLET_SPEED, 2, 6, "#0f0", "alien"));
                this.nextShoot = time + this.effectiveDelay(time, this.shootDelay, gameState);
            }
        }
    ]);
    return BottomShooterAlien;
}(AlienBase);
/* === класс: RapidFire – стреляет всегда, но с коротким кулдауном === */ var RapidFireAlien = exports.RapidFireAlien = /*#__PURE__*/ function(_AlienBase2) {
    _inherits(RapidFireAlien, _AlienBase2);
    function RapidFireAlien() {
        var _this2;
        _classCallCheck(this, RapidFireAlien);
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        _this2 = _callSuper(this, RapidFireAlien, [].concat(args));
        _this2.shootDelay = _constants.ALIEN_SHOOT_MIN + Math.random() * _constants.ALIEN_SHOOT_MAX;
        return _this2;
    }
    _createClass(RapidFireAlien, [
        {
            key: "shoot",
            value: function shoot(gameState, time) {
                if (time < this.nextShoot) return; // кулдаун ещё не прошёл
                var alienCX = this.x + (this.w >> 1);
                if (this._lowerMate && Math.random() < 0.95) return;
                if (gameState.playerBuffUntil > time) gameState.bullets.push(new _bullet["default"](alienCX - 1, this.y + this.h, _constants.RAPID_BULLET_SPEED * 2, 2, 6, "#ff5900", "yellowAlien"));
                else gameState.bullets.push(new _bullet["default"](alienCX - 1, this.y + this.h, _constants.RAPID_BULLET_SPEED, 2, 6, "#ff0", "yellowAlien"));
                this.nextShoot = time + this.effectiveDelay(time, this.shootDelay, gameState); // обновляем кулдаун
            }
        }
    ]);
    return RapidFireAlien;
}(AlienBase);

},{"9d87459a3f727e8e":"MfC6o","398fd525f28ac7cb":"3huJa"}],"3huJa":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.STREAK_BUFF_MS = exports.SHOOT_COOLDOWN = exports.RAPID_BULLET_SPEED = exports.PLAYER_LIVES = exports.PLAYER_BULLET_SPEED = exports.PLAYER_BONUS_BULLET_SPEED = exports.KILL_STREAK = exports.DEATH_PRICE = exports.BOTTOM_BULLET_SPEED = exports.BONUS_TIME_TO_LIVE = exports.BONUS_SPAWN_EVERY = exports.BONUS_PLAYER_MS = exports.BONUS_ALIENS_MS = exports.ALIEN_SHOOT_MIN = exports.ALIEN_SHOOT_MAX = exports.ALIEN_REFLECT_TIMES = exports.ALIEN_PRICE = exports.ALIEN_HORZ_SPEED = exports.ALIEN_DESCENT = void 0;
var ALIEN_REFLECT_TIMES = exports.ALIEN_REFLECT_TIMES = 2;
var ALIEN_HORZ_SPEED = exports.ALIEN_HORZ_SPEED = 1;
var ALIEN_DESCENT = exports.ALIEN_DESCENT = 40;
var ALIEN_SHOOT_MIN = exports.ALIEN_SHOOT_MIN = 1500;
var ALIEN_SHOOT_MAX = exports.ALIEN_SHOOT_MAX = 1000;
var SHOOT_COOLDOWN = exports.SHOOT_COOLDOWN = 600;
var PLAYER_LIVES = exports.PLAYER_LIVES = 3; // начальные жизни игрока
var BONUS_SPAWN_EVERY = exports.BONUS_SPAWN_EVERY = 7000; // новый бонус каждые ≈ 7 с
var BONUS_PLAYER_MS = exports.BONUS_PLAYER_MS = 3000; // усиление стрельбы игрока
var BONUS_ALIENS_MS = exports.BONUS_ALIENS_MS = 2000; // усиление стрельбы/скорости пришельцев
var KILL_STREAK = exports.KILL_STREAK = 3; // каждые 5 убийств – «ярость» пришельцев
var STREAK_BUFF_MS = exports.STREAK_BUFF_MS = 5000; // длительность этой «ярости»
var BONUS_TIME_TO_LIVE = exports.BONUS_TIME_TO_LIVE = 4000; // время жизни бонуса на экране
var ALIEN_PRICE = exports.ALIEN_PRICE = 100; // время жизни бонуса на экране
var DEATH_PRICE = exports.DEATH_PRICE = 2000; // время жизни бонуса на экране
var RAPID_BULLET_SPEED = exports.RAPID_BULLET_SPEED = 2.5;
var BOTTOM_BULLET_SPEED = exports.BOTTOM_BULLET_SPEED = .8;
var PLAYER_BULLET_SPEED = exports.PLAYER_BULLET_SPEED = -6;
var PLAYER_BONUS_BULLET_SPEED = exports.PLAYER_BONUS_BULLET_SPEED = -8;

},{}],"csRs5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var EventBus = exports["default"] = /*#__PURE__*/ function() {
    function EventBus() {
        _classCallCheck(this, EventBus);
        this._sub = Object.create(null); // {event → Set<fn>}
    }
    _createClass(EventBus, [
        {
            key: "on",
            value: function on(event, fn) {
                var _this$_sub;
                ((_this$_sub = this._sub)[event] || (_this$_sub[event] = new Set())).add(fn);
            }
        },
        {
            key: "off",
            value: function off(event, fn) {
                var _this$_sub$event;
                (_this$_sub$event = this._sub[event]) === null || _this$_sub$event === void 0 || _this$_sub$event["delete"](fn);
            }
        },
        {
            key: "emit",
            value: function emit(event, payload) {
                var _this$_sub$event2;
                (_this$_sub$event2 = this._sub[event]) === null || _this$_sub$event2 === void 0 || _this$_sub$event2.forEach(function(fn) {
                    return fn(payload);
                });
            }
        }
    ]);
    return EventBus;
}();

},{}],"4uqak":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var Bonus = exports["default"] = /*#__PURE__*/ function() {
    function Bonus(x, y, time) {
        _classCallCheck(this, Bonus);
        this.x = x;
        this.y = y;
        this.w = 18;
        this.h = 18;
        this.isDead = false;
        this.timeToLive = time;
    }
    _createClass(Bonus, [
        {
            key: "update",
            value: function update(time) {
                if (this.timeToLive < time) this.isDead = true;
            }
        },
        {
            key: "draw",
            value: function draw(ctx) {
                // «3 пули в квадратике»
                ctx.fillStyle = "#444";
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.fillStyle = "#fff";
                ctx.fillRect(this.x + 5, this.y + 4, 2, 6);
                ctx.fillRect(this.x + 11, this.y + 4, 2, 6);
                ctx.fillRect(this.x + 8, this.y + 8, 2, 6);
            }
        }
    ]);
    return Bonus;
}();

},{}]},["4rkIz","8lqZg"], "8lqZg", "parcelRequiref13a")

//# sourceMappingURL=index.975ef6c8.js.map
