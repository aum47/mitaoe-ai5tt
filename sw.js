importScripts("data.js");
const C="ai5-tt-v4",F=["./","./index.html","./data.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("ai5-tt-")&&x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))))});
self.addEventListener("push",e=>e.waitUntil((async()=>{
    const r=await(await caches.open("ai5-cfg")).match("cfg.json");
    const cfg=r?await r.json():{b:"A51",s:"A5A"};
    const a=alertFor(cfg,new Date())||{tag:"lec-soon",title:"⏰ A lecture starts soon",body:"Open the timetable for details."};
    await self.registration.showNotification(a.title,{body:a.body,tag:a.tag,icon:"icon-192.png",badge:"icon-192.png"});
})()));
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window"}).then(l=>l.length?l[0].focus():clients.openWindow("./")))});
