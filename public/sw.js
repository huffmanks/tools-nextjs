!function(){"use strict";var a={913:function(){try{self["workbox:core:6.5.2"]&&_()}catch(a){}},550:function(){try{self["workbox:expiration:6.5.2"]&&_()}catch(a){}},977:function(){try{self["workbox:precaching:6.5.2"]&&_()}catch(a){}},80:function(){try{self["workbox:routing:6.5.2"]&&_()}catch(a){}},873:function(){try{self["workbox:strategies:6.5.2"]&&_()}catch(a){}}},b={};function c(d){var f=b[d];if(void 0!==f)return f.exports;var e=b[d]={exports:{}},g=!0;try{a[d](e,e.exports,c),g=!1}finally{g&&delete b[d]}return e.exports}!function(){c(913);class k extends Error{constructor(a,b){let c=((c,...a)=>{let b=c;return a.length>0&&(b+=` :: ${JSON.stringify(a)}`),b})(a,b);super(c),this.name=a,this.details=b}}let l=new Set,m={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=a=>[m.prefix,a,m.suffix].filter(a=>a&&a.length>0).join("-"),o=a=>{for(let b of Object.keys(m))a(b)},p={updateDetails(a){o(b=>{"string"==typeof a[b]&&(m[b]=a[b])})},getGoogleAnalyticsName:a=>a||n(m.googleAnalytics),getPrecacheName:a=>a||n(m.precache),getPrefix:()=>m.prefix,getRuntimeName:a=>a||n(m.runtime),getSuffix:()=>m.suffix};function q(b,c){let a=new URL(b);for(let d of c)a.searchParams.delete(d);return a.href}async function r(b,a,d,c){let e=q(a.url,d);if(a.url===e)return b.match(a,c);let g=Object.assign(Object.assign({},c),{ignoreSearch:!0}),h=await b.keys(a,g);for(let f of h){let i=q(f.url,d);if(e===i)return b.match(f,c)}}let s;function t(a){a.then(()=>{})}async function u(){for(let a of l)await a()}let v=a=>{let b=new URL(String(a),location.href);return b.href.replace(RegExp(`^${location.origin}`),"")};function w(b,c){let a=c();return b.waitUntil(a),a}async function x(b,d){let c=null;if(b.url){let f=new URL(b.url);c=f.origin}if(c!==self.location.origin)throw new k("cross-origin-copy-response",{origin:c});let a=b.clone(),e={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},g=d?d(e):e,h=!function(){if(void 0===s){let a=new Response("");if("body"in a)try{new Response(a.body),s=!0}catch(b){s=!1}s=!1}return s}()?await a.blob():a.body;return new Response(h,g)}let y=(b,a)=>a.some(a=>b instanceof a),z,A,B=new WeakMap,C=new WeakMap,D=new WeakMap,E=new WeakMap,F=new WeakMap,G={get(a,b,c){if(a instanceof IDBTransaction){if("done"===b)return C.get(a);if("objectStoreNames"===b)return a.objectStoreNames||D.get(a);if("store"===b)return c.objectStoreNames[1]?void 0:c.objectStore(c.objectStoreNames[0])}return H(a[b])},set:(a,b,c)=>(a[b]=c,!0),has:(b,a)=>b instanceof IDBTransaction&&("done"===a||"store"===a)||a in b};function H(a){if(a instanceof IDBRequest)return function(b){let a=new Promise((d,e)=>{let f=()=>{b.removeEventListener("success",a),b.removeEventListener("error",c)},a=()=>{d(H(b.result)),f()},c=()=>{e(b.error),f()};b.addEventListener("success",a),b.addEventListener("error",c)});return a.then(a=>{a instanceof IDBCursor&&B.set(a,b)}).catch(()=>{}),F.set(a,b),a}(a);if(E.has(a))return E.get(a);let b=function(a){if("function"==typeof a){var b;return(b=a)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(A||(A=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey,])).includes(b)?function(...a){return b.apply(I(this),a),H(B.get(this))}:function(...a){return H(b.apply(I(this),a))}:function(a,...d){let c=b.call(I(this),a,...d);return D.set(c,a.sort?a.sort():[a]),H(c)}}return(a instanceof IDBTransaction&&function(a){if(C.has(a))return;let b=new Promise((d,e)=>{let f=()=>{a.removeEventListener("complete",c),a.removeEventListener("error",b),a.removeEventListener("abort",b)},c=()=>{d(),f()},b=()=>{e(a.error||new DOMException("AbortError","AbortError")),f()};a.addEventListener("complete",c),a.addEventListener("error",b),a.addEventListener("abort",b)});C.set(a,b)}(a),y(a,z||(z=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction,])))?new Proxy(a,G):a}(a);return b!==a&&(E.set(a,b),F.set(b,a)),b}let I=a=>F.get(a),J=["get","getKey","getAll","getAllKeys","count"],K=["put","add","delete","clear"],L=new Map;function M(c,a){if(!(c instanceof IDBDatabase&&!(a in c)&&"string"==typeof a))return;if(L.get(a))return L.get(a);let b=a.replace(/FromIndex$/,""),e=a!==b,f=K.includes(b);if(!(b in(e?IDBIndex:IDBObjectStore).prototype)||!(f||J.includes(b)))return;let d=async function(g,...c){let d=this.transaction(g,f?"readwrite":"readonly"),a=d.store;return e&&(a=a.index(c.shift())),(await Promise.all([a[b](...c),f&&d.done,]))[0]};return L.set(a,d),d}!function(a){G=a(G)}(a=>({...a,get:(b,c,d)=>M(b,c)||a.get(b,c,d),has:(b,c)=>!!M(b,c)||a.has(b,c)})),c(550);let N="cache-entries",O=b=>{let a=new URL(b,location.href);return a.hash="",a.href};class P{constructor(b,a={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=a.maxEntries,this._maxAgeSeconds=a.maxAgeSeconds,this._matchOptions=a.matchOptions,this._cacheName=b,this._timestampModel=new class{constructor(a){this._db=null,this._cacheName=a}_upgradeDb(b){let a=b.createObjectStore(N,{keyPath:"id"});a.createIndex("cacheName","cacheName",{unique:!1}),a.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(a){this._upgradeDb(a),this._cacheName&&function(b,{blocked:c}={}){let a=indexedDB.deleteDatabase(b);c&&a.addEventListener("blocked",()=>c()),H(a).then(()=>void 0)}(this._cacheName)}async setTimestamp(a,c){a=O(a);let d={url:a,timestamp:c,cacheName:this._cacheName,id:this._getId(a)},e=await this.getDb(),b=e.transaction(N,"readwrite",{durability:"relaxed"});await b.store.put(d),await b.done}async getTimestamp(b){let c=await this.getDb(),a=await c.get(N,this._getId(b));return null==a?void 0:a.timestamp}async expireEntries(b,c){let d=await this.getDb(),a=await d.transaction(N).store.index("timestamp").openCursor(null,"prev"),e=[],f=0;for(;a;){let g=a.value;g.cacheName===this._cacheName&&(b&&g.timestamp<b||c&&f>=c?e.push(a.value):f++),a=await a.continue()}let h=[];for(let i of e)await d.delete(N,i.id),h.push(i.url);return h}_getId(a){return this._cacheName+"|"+O(a)}async getDb(){return this._db||(this._db=await function(c,f,{blocked:d,upgrade:e,blocking:g,terminated:h}={}){let a=indexedDB.open(c,1),b=H(a);return e&&a.addEventListener("upgradeneeded",b=>{e(H(a.result),b.oldVersion,b.newVersion,H(a.transaction))}),d&&a.addEventListener("blocked",()=>d()),b.then(a=>{h&&a.addEventListener("close",()=>h()),g&&a.addEventListener("versionchange",()=>g())}).catch(()=>{}),b}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}(b)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;let a=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,b=await this._timestampModel.expireEntries(a,this._maxEntries),c=await self.caches.open(this._cacheName);for(let d of b)await c.delete(d,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,t(this.expireEntries()))}async updateTimestamp(a){await this._timestampModel.setTimestamp(a,Date.now())}async isURLExpired(b){if(!this._maxAgeSeconds)return!1;{let a=await this._timestampModel.getTimestamp(b),c=Date.now()-1e3*this._maxAgeSeconds;return void 0===a||a<c}}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class a{constructor(a={}){this.cachedResponseWillBeUsed=async({event:b,request:d,cacheName:e,cachedResponse:a})=>{if(!a)return null;let f=this._isResponseDateFresh(a),c=this._getCacheExpiration(e);t(c.expireEntries());let g=c.updateTimestamp(d.url);if(b)try{b.waitUntil(g)}catch(h){}return f?a:null},this.cacheDidUpdate=async({cacheName:b,request:c})=>{let a=this._getCacheExpiration(b);await a.updateTimestamp(c.url),await a.expireEntries()},this._config=a,this._maxAgeSeconds=a.maxAgeSeconds,this._cacheExpirations=new Map,a.purgeOnQuotaError&&function(a){l.add(a)}(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(a){if(a===p.getRuntimeName())throw new k("expire-custom-caches-only");let b=this._cacheExpirations.get(a);return b||(b=new P(a,this._config),this._cacheExpirations.set(a,b)),b}_isResponseDateFresh(b){if(!this._maxAgeSeconds)return!0;let a=this._getDateHeaderTimestamp(b);if(null===a)return!0;let c=Date.now();return a>=c-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(a){if(!a.headers.has("date"))return null;let c=a.headers.get("date"),d=new Date(c),b=d.getTime();return isNaN(b)?null:b}async deleteCacheAndMetadata(){for(let[a,b]of this._cacheExpirations)await self.caches.delete(a),await b.delete();this._cacheExpirations=new Map}}function Q(a){return"string"==typeof a?new Request(a):a}c(873);class R{constructor(a,b){for(let c of(this._cacheKeys={},Object.assign(this,b),this.event=b.event,this._strategy=a,this._handlerDeferred=new class{constructor(){this.promise=new Promise((a,b)=>{this.resolve=a,this.reject=b})}},this._extendLifetimePromises=[],this._plugins=[...a.plugins],this._pluginStateMap=new Map,this._plugins))this._pluginStateMap.set(c,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(i){let{event:b}=this,a=Q(i);if("navigate"===a.mode&&b instanceof FetchEvent&&b.preloadResponse){let d=await b.preloadResponse;if(d)return d}let e=this.hasCallback("fetchDidFail")?a.clone():null;try{for(let j of this.iterateCallbacks("requestWillFetch"))a=await j({request:a.clone(),event:b})}catch(f){if(f instanceof Error)throw new k("plugin-error-request-will-fetch",{thrownErrorMessage:f.message})}let g=a.clone();try{let c;for(let l of(c=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions),this.iterateCallbacks("fetchDidSucceed")))c=await l({event:b,request:g,response:c});return c}catch(h){throw e&&await this.runCallbacks("fetchDidFail",{error:h,event:b,originalRequest:e.clone(),request:g.clone()}),h}}async fetchAndCachePut(a){let b=await this.fetch(a),c=b.clone();return this.waitUntil(this.cachePut(a,c)),b}async cacheMatch(e){let f=Q(e),a,{cacheName:b,matchOptions:c}=this._strategy,d=await this.getCacheKey(f,"read"),g=Object.assign(Object.assign({},c),{cacheName:b});for(let h of(a=await caches.match(d,g),this.iterateCallbacks("cachedResponseWillBeUsed")))a=await h({cacheName:b,matchOptions:c,cachedResponse:a,request:d,event:this.event})||void 0;return a}async cachePut(h,d){var n;let i=Q(h);await new Promise(a=>setTimeout(a,0));let a=await this.getCacheKey(i,"write");if(!d)throw new k("cache-put-with-no-response",{url:v(a.url)});let b=await this._ensureResponseSafeToCache(d);if(!b)return!1;let{cacheName:e,matchOptions:j}=this._strategy,f=await self.caches.open(e),g=this.hasCallback("cacheDidUpdate"),l=g?await r(f,a.clone(),["__WB_REVISION__"],j):null;try{await f.put(a,g?b.clone():b)}catch(c){if(c instanceof Error)throw"QuotaExceededError"===c.name&&await u(),c}for(let m of this.iterateCallbacks("cacheDidUpdate"))await m({cacheName:e,oldResponse:l,newResponse:b.clone(),request:a,event:this.event});return!0}async getCacheKey(c,d){let a=`${c.url} | ${d}`;if(!this._cacheKeys[a]){let b=c;for(let e of this.iterateCallbacks("cacheKeyWillBeUsed"))b=Q(await e({mode:d,request:b,event:this.event,params:this.params}));this._cacheKeys[a]=b}return this._cacheKeys[a]}hasCallback(a){for(let b of this._strategy.plugins)if(a in b)return!0;return!1}async runCallbacks(a,b){for(let c of this.iterateCallbacks(a))await c(b)}*iterateCallbacks(b){for(let a of this._strategy.plugins)if("function"==typeof a[b]){let d=this._pluginStateMap.get(a),c=c=>{let e=Object.assign(Object.assign({},c),{state:d});return a[b](e)};yield c}}waitUntil(a){return this._extendLifetimePromises.push(a),a}async doneWaiting(){let a;for(;a=this._extendLifetimePromises.shift();)await a}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(c){let a=c,b=!1;for(let d of this.iterateCallbacks("cacheWillUpdate"))if(a=await d({request:this.request,response:a,event:this.event})||void 0,b=!0,!a)break;return!b&&a&&200!==a.status&&(a=void 0),a}}class e{constructor(a={}){this.cacheName=p.getRuntimeName(a.cacheName),this.plugins=a.plugins||[],this.fetchOptions=a.fetchOptions,this.matchOptions=a.matchOptions}handle(a){let[b]=this.handleAll(a);return b}handleAll(a){a instanceof FetchEvent&&(a={event:a,request:a.request});let b=a.event,c="string"==typeof a.request?new Request(a.request):a.request,f="params"in a?a.params:void 0,d=new R(this,{event:b,request:c,params:f}),e=this._getResponse(d,c,b),g=this._awaitComplete(e,d,c,b);return[e,g]}async _getResponse(c,b,d){await c.runCallbacks("handlerWillStart",{event:d,request:b});let a;try{if(!(a=await this._handle(b,c))||"error"===a.type)throw new k("no-response",{url:b.url})}catch(e){if(e instanceof Error){for(let f of c.iterateCallbacks("handlerDidError"))if(a=await f({error:e,event:d,request:b}))break}if(a);else throw e}for(let g of c.iterateCallbacks("handlerWillRespond"))a=await g({event:d,request:b,response:a});return a}async _awaitComplete(g,a,d,e){let c,b;try{c=await g}catch(h){}try{await a.runCallbacks("handlerDidRespond",{event:e,request:d,response:c}),await a.doneWaiting()}catch(f){f instanceof Error&&(b=f)}if(await a.runCallbacks("handlerDidComplete",{event:e,request:d,response:c,error:b}),a.destroy(),b)throw b}}let S={cacheWillUpdate:async({response:a})=>200===a.status||0===a.status?a:null};class f extends e{constructor(a={}){super(a),this.plugins.some(a=>"cacheWillUpdate"in a)||this.plugins.unshift(S),this._networkTimeoutSeconds=a.networkTimeoutSeconds||0}async _handle(a,b){let c=[],d=[],e;if(this._networkTimeoutSeconds){let{id:g,promise:h}=this._getTimeoutPromise({request:a,logs:c,handler:b});e=g,d.push(h)}let i=this._getNetworkPromise({timeoutId:e,request:a,logs:c,handler:b});d.push(i);let f=await b.waitUntil((async()=>await b.waitUntil(Promise.race(d))||await i)());if(!f)throw new k("no-response",{url:a.url});return f}_getTimeoutPromise({request:c,logs:d,handler:e}){let a,b=new Promise(d=>{let b=async()=>{d(await e.cacheMatch(c))};a=setTimeout(b,1e3*this._networkTimeoutSeconds)});return{promise:b,id:a}}async _getNetworkPromise({timeoutId:b,request:c,logs:g,handler:d}){let e,a;try{a=await d.fetchAndCachePut(c)}catch(f){f instanceof Error&&(e=f)}return b&&clearTimeout(b),(e||!a)&&(a=await d.cacheMatch(c)),a}}class d extends e{constructor(a={}){super(a),this.plugins.some(a=>"cacheWillUpdate"in a)||this.plugins.unshift(S)}async _handle(b,c){let d=c.fetchAndCachePut(b).catch(()=>{});c.waitUntil(d);let a=await c.cacheMatch(b),e;if(a);else try{a=await d}catch(f){f instanceof Error&&(e=f)}if(!a)throw new k("no-response",{url:b.url,error:e});return a}}c(80);let T=a=>a&&"object"==typeof a?a:{handle:a};class g{constructor(a,b,c="GET"){this.handler=T(b),this.match=a,this.method=c}setCatchHandler(a){this.catchHandler=T(a)}}class U extends g{constructor(c,a,b){super(({url:b})=>{let a=c.exec(b.href);if(a&&(b.origin===location.origin||0===a.index))return a.slice(1)},a,b)}}class V{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",a=>{let{request:c}=a,b=this.handleRequest({request:c,event:a});b&&a.respondWith(b)})}addCacheListener(){self.addEventListener("message",a=>{if(a.data&&"CACHE_URLS"===a.data.type){let{payload:c}=a.data,b=Promise.all(c.urlsToCache.map(b=>{"string"==typeof b&&(b=[b]);let c=new Request(...b);return this.handleRequest({request:c,event:a})}));a.waitUntil(b),a.ports&&a.ports[0]&&b.then(()=>a.ports[0].postMessage(!0))}})}handleRequest({request:b,event:f}){let c=new URL(b.url,location.href);if(!c.protocol.startsWith("http"))return;let h=c.origin===location.origin,{params:i,route:d}=this.findMatchingRoute({event:f,request:b,sameOrigin:h,url:c}),e=d&&d.handler,g=b.method;if(!e&&this._defaultHandlerMap.has(g)&&(e=this._defaultHandlerMap.get(g)),!e)return;let a;try{a=e.handle({url:c,request:b,event:f,params:i})}catch(j){a=Promise.reject(j)}let k=d&&d.catchHandler;return a instanceof Promise&&(this._catchHandler||k)&&(a=a.catch(async a=>{if(k)try{return await k.handle({url:c,request:b,event:f,params:i})}catch(d){d instanceof Error&&(a=d)}if(this._catchHandler)return this._catchHandler.handle({url:c,request:b,event:f});throw a})),a}findMatchingRoute({url:e,sameOrigin:f,request:c,event:g}){let h=this._routes.get(c.method)||[];for(let d of h){let a,b=d.match({url:e,sameOrigin:f,request:c,event:g});if(b)return Array.isArray(a=b)&&0===a.length?a=void 0:b.constructor===Object&&0===Object.keys(b).length?a=void 0:"boolean"==typeof b&&(a=void 0),{route:d,params:a}}return{}}setDefaultHandler(a,b="GET"){this._defaultHandlerMap.set(b,T(a))}setCatchHandler(a){this._catchHandler=T(a)}registerRoute(a){this._routes.has(a.method)||this._routes.set(a.method,[]),this._routes.get(a.method).push(a)}unregisterRoute(a){if(!this._routes.has(a.method))throw new k("unregister-route-but-not-found-with-method",{method:a.method});let b=this._routes.get(a.method).indexOf(a);if(b> -1)this._routes.get(a.method).splice(b,1);else throw new k("unregister-route-route-not-registered")}}let W,X=()=>(W||((W=new V).addFetchListener(),W.addCacheListener()),W);function b(a,c,d){let b;if("string"==typeof a){let h=new URL(a,location.href),e=({url:a})=>a.href===h.href;b=new g(e,c,d)}else if(a instanceof RegExp)b=new U(a,c,d);else if("function"==typeof a)b=new g(a,c,d);else if(a instanceof g)b=a;else throw new k("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});let f=X();return f.registerRoute(b),b}function Y(a){if(!a)throw new k("add-to-cache-list-unexpected-type",{entry:a});if("string"==typeof a){let c=new URL(a,location.href);return{cacheKey:c.href,url:c.href}}let{revision:d,url:b}=a;if(!b)throw new k("add-to-cache-list-unexpected-type",{entry:a});if(!d){let e=new URL(b,location.href);return{cacheKey:e.href,url:e.href}}let f=new URL(b,location.href),g=new URL(b,location.href);return f.searchParams.set("__WB_REVISION__",d),{cacheKey:f.href,url:g.href}}c(977);class Z{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:b,state:a})=>{a&&(a.originalRequest=b)},this.cachedResponseWillBeUsed=async({event:d,state:a,cachedResponse:b})=>{if("install"===d.type&&a&&a.originalRequest&&a.originalRequest instanceof Request){let c=a.originalRequest.url;b?this.notUpdatedURLs.push(c):this.updatedURLs.push(c)}return b}}}class h extends e{constructor(a={}){a.cacheName=p.getPrecacheName(a.cacheName),super(a),this._fallbackToNetwork=!1!==a.fallbackToNetwork,this.plugins.push(h.copyRedirectedCacheableResponsesPlugin)}async _handle(b,a){let c=await a.cacheMatch(b);return c||(a.event&&"install"===a.event.type?await this._handleInstall(b,a):await this._handleFetch(b,a))}async _handleFetch(a,b){let c,f=b.params||{};if(this._fallbackToNetwork){let d=f.integrity,e=a.integrity,g=!e||e===d;c=await b.fetch(new Request(a,{integrity:e||d})),d&&g&&(this._useDefaultCacheabilityPluginIfNeeded(),await b.cachePut(a,c.clone()))}else throw new k("missing-precache-entry",{cacheName:this.cacheName,url:a.url});return c}async _handleInstall(a,c){this._useDefaultCacheabilityPluginIfNeeded();let b=await c.fetch(a),d=await c.cachePut(a,b.clone());if(!d)throw new k("bad-precaching-response",{url:a.url,status:b.status});return b}_useDefaultCacheabilityPluginIfNeeded(){let a=null,b=0;for(let[d,c]of this.plugins.entries())c!==h.copyRedirectedCacheableResponsesPlugin&&(c===h.defaultPrecacheCacheabilityPlugin&&(a=d),c.cacheWillUpdate&&b++);0===b?this.plugins.push(h.defaultPrecacheCacheabilityPlugin):b>1&&null!==a&&this.plugins.splice(a,1)}}h.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:a})=>!a||a.status>=400?null:a},h.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:a})=>a.redirected?await x(a):a};class ${constructor({cacheName:a,plugins:b=[],fallbackToNetwork:c=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new h({cacheName:p.getPrecacheName(a),plugins:[...b,new class{constructor({precacheController:a}){this.cacheKeyWillBeUsed=async({request:a,params:b})=>{let c=(null==b?void 0:b.cacheKey)||this._precacheController.getCacheKeyForURL(a.url);return c?new Request(c,{headers:a.headers}):a},this._precacheController=a}}({precacheController:this}),],fallbackToNetwork:c}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(a){this.addToCacheList(a),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let d=[];for(let a of e){"string"==typeof a?d.push(a):a&& void 0===a.revision&&d.push(a.url);let{cacheKey:b,url:c}=Y(a),f="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(c)&&this._urlsToCacheKeys.get(c)!==b)throw new k("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(c),secondEntry:b});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(b)&&this._cacheKeysToIntegrities.get(b)!==a.integrity)throw new k("add-to-cache-list-conflicting-integrities",{url:c});this._cacheKeysToIntegrities.set(b,a.integrity)}if(this._urlsToCacheKeys.set(c,b),this._urlsToCacheModes.set(c,f),d.length>0){let g=`Workbox is precaching URLs without revision info: ${d.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(g)}}}install(a){return w(a,async()=>{let b=new Z;for(let[c,d]of(this.strategy.plugins.push(b),this._urlsToCacheKeys)){let e=this._cacheKeysToIntegrities.get(d),f=this._urlsToCacheModes.get(c),g=new Request(c,{integrity:e,cache:f,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:d},request:g,event:a}))}let{updatedURLs:h,notUpdatedURLs:i}=b;return{updatedURLs:h,notUpdatedURLs:i}})}activate(a){return w(a,async()=>{let b=await self.caches.open(this.strategy.cacheName),d=await b.keys(),e=new Set(this._urlsToCacheKeys.values()),c=[];for(let a of d)e.has(a.url)||(await b.delete(a),c.push(a.url));return{deletedURLs:c}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(a){let b=new URL(a,location.href);return this._urlsToCacheKeys.get(b.href)}getIntegrityForCacheKey(a){return this._cacheKeysToIntegrities.get(a)}async matchPrecache(a){let c=a instanceof Request?a.url:a,b=this.getCacheKeyForURL(c);if(b){let d=await self.caches.open(this.strategy.cacheName);return d.match(b)}}createHandlerBoundToURL(a){let b=this.getCacheKeyForURL(a);if(!b)throw new k("non-precached-url",{url:a});return c=>(c.request=new Request(a),c.params=Object.assign({cacheKey:b},c.params),this.strategy.handle(c))}}let aa,ab=()=>(aa||(aa=new $),aa);class ac extends g{constructor(a,b){super(({request:d})=>{let e=a.getURLsToCacheKeys();for(let f of function*(g,{ignoreURLParametersMatching:h=[/^utm_/,/^fbclid$/],directoryIndex:c="index.html",cleanURLs:i=!0,urlManipulation:d}={}){let a=new URL(g,location.href);a.hash="",yield a.href;let b=function(a,b=[]){for(let c of[...a.searchParams.keys()])b.some(a=>a.test(c))&&a.searchParams.delete(c);return a}(a,h);if(yield b.href,c&&b.pathname.endsWith("/")){let e=new URL(b.href);e.pathname+=c,yield e.href}if(i){let f=new URL(b.href);f.pathname+=".html",yield f.href}if(d){let j=d({url:a});for(let k of j)yield k.href}}(d.url,b)){let c=e.get(f);if(c){let g=a.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:g}}}},a.strategy)}}let ad=async(c,d="-precache-")=>{let b=await self.caches.keys(),a=b.filter(a=>a.includes(d)&&a.includes(self.registration.scope)&&a!==c);return await Promise.all(a.map(a=>self.caches.delete(a))),a};function ae(a){let b=ab();return b.matchPrecache(a)}self.skipWaiting(),self.addEventListener("activate",()=>self.clients.claim());var j,i=[{'revision':'955507514ea498714bf1171d6a8d9945','url':'/_next/static/6CWv6F_IR9RfBtYy-b561/_buildManifest.js'},{'revision':'5352cb582146311d1540f6075d1f265e','url':'/_next/static/6CWv6F_IR9RfBtYy-b561/_ssgManifest.js'},{'revision':'e1738dbd884a4e05','url':'/_next/static/chunks/102-e1738dbd884a4e05.js'},{'revision':'9c31f10499577ddc','url':'/_next/static/chunks/147-9c31f10499577ddc.js'},{'revision':'c7497ae1141a5de6','url':'/_next/static/chunks/162-c7497ae1141a5de6.js'},{'revision':'ff19dac17921630c','url':'/_next/static/chunks/284-ff19dac17921630c.js'},{'revision':'cda1f6509a123aaf','url':'/_next/static/chunks/323-cda1f6509a123aaf.js'},{'revision':'cf60bae3d5b7276f','url':'/_next/static/chunks/327-cf60bae3d5b7276f.js'},{'revision':'b641088cca4f87ea','url':'/_next/static/chunks/415-b641088cca4f87ea.js'},{'revision':'da03c1148bc02fea','url':'/_next/static/chunks/662-da03c1148bc02fea.js'},{'revision':'1ebdaf2183ab66e6','url':'/_next/static/chunks/7-1ebdaf2183ab66e6.js'},{'revision':'239fee6c4031c2be','url':'/_next/static/chunks/904-239fee6c4031c2be.js'},{'revision':'f7ed6695fe49b498','url':'/_next/static/chunks/951-f7ed6695fe49b498.js'},{'revision':'961a6bfa5d1c69d4','url':'/_next/static/chunks/998-961a6bfa5d1c69d4.js'},{'revision':'ae4f43955bfa5ddc','url':'/_next/static/chunks/framework-ae4f43955bfa5ddc.js'},{'revision':'0ec0d8eda095e9ae','url':'/_next/static/chunks/main-0ec0d8eda095e9ae.js'},{'revision':'e26de6df97d8c33d','url':'/_next/static/chunks/pages/404-e26de6df97d8c33d.js'},{'revision':'2adb7c03d4039b79','url':'/_next/static/chunks/pages/_app-2adb7c03d4039b79.js'},{'revision':'7397496ca01950b1','url':'/_next/static/chunks/pages/_error-7397496ca01950b1.js'},{'revision':'a83a30738bda6ced','url':'/_next/static/chunks/pages/calculate/aspect-ratio-a83a30738bda6ced.js'},{'revision':'9781c25a3d32a5e1','url':'/_next/static/chunks/pages/calculate/units-9781c25a3d32a5e1.js'},{'revision':'b5ea5b9680bd51f6','url':'/_next/static/chunks/pages/fallback-b5ea5b9680bd51f6.js'},{'revision':'9f23491bed2f9721','url':'/_next/static/chunks/pages/format/text-9f23491bed2f9721.js'},{'revision':'cb406686f481c517','url':'/_next/static/chunks/pages/generate/email-signature-cb406686f481c517.js'},{'revision':'55907f05309e2112','url':'/_next/static/chunks/pages/generate/password-55907f05309e2112.js'},{'revision':'939f8e33d2ef3f8d','url':'/_next/static/chunks/pages/generate/qr-code-939f8e33d2ef3f8d.js'},{'revision':'e2a4679ba098aadf','url':'/_next/static/chunks/pages/generate/todo-e2a4679ba098aadf.js'},{'revision':'912d3ad1b60617a7','url':'/_next/static/chunks/pages/index-912d3ad1b60617a7.js'},{'revision':'4d969b2aea9d6f5e','url':'/_next/static/chunks/pages/picker/color-4d969b2aea9d6f5e.js'},{'revision':'7718c577216105cc','url':'/_next/static/chunks/pages/picker/item-7718c577216105cc.js'},{'revision':'c868431e745aa9fa','url':'/_next/static/chunks/pages/picker/number-c868431e745aa9fa.js'},{'revision':'40ccea369337cec877151c906f22814d','url':'/_next/static/chunks/polyfills-0d1b80a048d4787e.js'},{'revision':'3cb798c60d438036','url':'/_next/static/chunks/webpack-3cb798c60d438036.js'},{'revision':'2b8d03dbf226ab4e','url':'/_next/static/css/2b8d03dbf226ab4e.css'},{'revision':'9306e7a1f49db96cd9e21c3f5ac00960','url':'/logos/favicon.ico'},{'revision':'e3ef67dca0ef7d1ef81e1989fd991d65','url':'/logos/logo-192x192.png'},{'revision':'538c2b4f207a546d447c191abb33603e','url':'/logos/logo-512x512.png'},{'revision':'f9e364f6a8b72e70f02a141b632a3f30','url':'/logos/strata-logo.png'},{'revision':'e84b4a5036142157652f71197d14afb6','url':'/logos/stratools-stacked.png'},{'revision':'0ef992bd7dce07aa703b67e8921a10d8','url':'/manifest.json'},{'revision':'dcc52606b3acbae9de04ace3483e9f21','url':'/previews/aspect-ratio.png'},{'revision':'00b4a302de3f2a9f82fc6e2b5398b3ae','url':'/previews/color-picker.png'},{'revision':'8f50e68b0bf03fc86dc0cc03da17e8b8','url':'/previews/email-signature.png'},{'revision':'0f98d5a179240b79314744d3df8c7918','url':'/previews/item-picker.png'},{'revision':'353b0ae36f84f97d2ab1cbf83f93401c','url':'/previews/number-picker.png'},{'revision':'cb49ae68fecd78ec6e3d753a93dee2db','url':'/previews/password-generator.png'},{'revision':'84b4094adab531dbf04916bee4867a9f','url':'/previews/text-formatter.png'},{'revision':'8a390cef4efcaffd83498e9cf065b8cd','url':'/previews/todo-list.png'},{'revision':'addc76e2f2a6fac344a06b35167e2191','url':'/previews/unit-calculator.png'},{'revision':'194ae73796bf74fe0adbf77be4f61c9b','url':'/readme/color-picker.png'},{'revision':'8d94a8d65f7737e64aa2be0a27df5a8a','url':'/readme/unit-calculator.png'},{'revision':'a42a7c48df12d5f28cd02f8d6ee55adf','url':'/robots.txt'},{'revision':'7ecb7004bba8b5c81996f90af23fd99a','url':'/sitemap-0.xml'},{'revision':'4eeb8987def41f2839077fae32ea22f0','url':'/sitemap.xml'},{'revision':'3d0f9256c9f6328dd4d2a6c0670305fa','url':'/sw.js'}];i.push({url:"/fallback",revision:"1234567890"}),function(a){let b=ab();b.precache(a)}(j=i),function(a){let c=ab(),d=new ac(c,a);b(d)}(void 0),self.addEventListener("activate",a=>{let b=p.getPrecacheName();a.waitUntil(ad(b).then(a=>{}))}),b("/",new f({cacheName:"start-url",plugins:[new a({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0}),]}),"GET"),b(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new class extends e{async _handle(b,c){let a=await c.cacheMatch(b),d;if(!a)try{a=await c.fetchAndCachePut(b)}catch(e){e instanceof Error&&(d=e)}if(!a)throw new k("no-response",{url:b.url,error:d});return a}}({cacheName:"google-fonts",plugins:[new a({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0}),]}),"GET"),b(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new d({cacheName:"static-image-assets",plugins:[new a({maxEntries:64,maxAgeSeconds:7776e3,purgeOnQuotaError:!0}),]}),"GET"),b(/\.(?:js)$/i,new d({cacheName:"static-js-assets",plugins:[new a({maxEntries:32,maxAgeSeconds:7776e3,purgeOnQuotaError:!0}),]}),"GET"),b(/\.(?:css|less)$/i,new d({cacheName:"static-style-assets",plugins:[new a({maxEntries:32,maxAgeSeconds:7776e3,purgeOnQuotaError:!0}),]}),"GET"),b(/\.(?:json|xml|csv)$/i,new f({cacheName:"static-data-assets",plugins:[new a({maxEntries:32,maxAgeSeconds:7776e3,purgeOnQuotaError:!0}),]}),"GET"),b(/.*/i,new f({cacheName:"others",networkTimeoutSeconds:10,plugins:[new a({maxEntries:32,maxAgeSeconds:7776e3,purgeOnQuotaError:!0}),]}),"GET"),function(a){let b=X();b.setDefaultHandler(a)}(new d),function(a){let b=X();b.setCatchHandler(a)}(function(a){var b=a.event;switch(b.request.destination){case"document":return ae("/fallback");case"image":return ae("/logos/stratools-stacked.png");default:return Response.error()}})}()}()