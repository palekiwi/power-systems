"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/power-systems/index.html","cfdff7e72f7142642e1d919893a4a7cf"],["/power-systems/static/js/main.e421a9a2.js","e1e41812e296bcc115961c1d22726a06"],["/power-systems/static/media/battery-container.e54f85ed.png","e54f85edc2b7c2ecadbc94a6abde7dec"],["/power-systems/static/media/biomass.64e6f252.png","64e6f252ca294b910af02a50658acfd3"],["/power-systems/static/media/boat.89e0c115.png","89e0c115c73c99ab37038b7b71892989"],["/power-systems/static/media/community-center.6c44af63.png","6c44af6368fc0e3a249c44dd5fb672c7"],["/power-systems/static/media/diesel-generator.212d5836.png","212d583600171e54815f146cf2a3567a"],["/power-systems/static/media/factory.5aea44b7.png","5aea44b78a74fe81b9090619005dd395"],["/power-systems/static/media/factory2.c9c10bfb.png","c9c10bfb590dbf5591c55d97c6a06a62"],["/power-systems/static/media/farm.7fabefa6.png","7fabefa69eda7c97fad2dca1ea947f46"],["/power-systems/static/media/gas-engine.36acf217.png","36acf217a713181e0bbae54be79c91d9"],["/power-systems/static/media/gasification.c3508ca7.png","c3508ca7f5f0fe7bdcfa99148ecbbd30"],["/power-systems/static/media/hospital.24c3d686.png","24c3d68693e5fbfb2fb38d9df55ff8e2"],["/power-systems/static/media/house-elevated.c0889571.png","c08895718bc809bd1d1aed4a7c381c7d"],["/power-systems/static/media/house-thatched.4cd5e9a8.png","4cd5e9a87994f6e7dc57081d426b21fc"],["/power-systems/static/media/power-pole.d66dd194.png","d66dd194d83d9e5b6169336bd52be80d"],["/power-systems/static/media/pv-solar.2d8b1141.png","2d8b1141b37362054c7f4b4b8f5ad8e4"],["/power-systems/static/media/school-field.a5d12927.png","a5d1292760a7836a5b579f08b815a7d9"],["/power-systems/static/media/solar.54fd6571.png","54fd6571a926c7646c0ab0d14cdaf2c0"],["/power-systems/static/media/temple.3b0f2949.png","3b0f29492299cd5e7be6492388d30dfd"],["/power-systems/static/media/warehouse.712e4cb3.png","712e4cb372cf7444dc6d64a30fb2490b"],["/power-systems/static/media/wind-generator.5ab7976d.png","5ab7976d03854a4e4faecb6ff5dacfff"],["/power-systems/static/media/wind-generator.df804e51.png","df804e51667475758e08118dd0428727"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),n=createCacheKey(s,hashParamName,a,/\.\w{8}\./);return[s.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/power-systems/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});