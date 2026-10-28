const V='fox-v3';
const BASE=self.registration.scope;
const A=[BASE,BASE+'index.html',BASE+'manifest.webmanifest',BASE+'icons/icon-192.png',BASE+'icons/icon-512.png',BASE+'assets/foxy-mascot-refined.png',BASE+'assets/category-animals.png',BASE+'assets/category-fruits.png',BASE+'assets/category-food.png',BASE+'assets/category-vehicles.png',BASE+'assets/category-nature.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(V).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(BASE)))});
