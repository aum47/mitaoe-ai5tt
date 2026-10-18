importScripts("data.js");
const C="ai5-tt-v6",F=["./","./index.html","./data.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const cfgGet=async()=>{const r=await(await caches.open("ai5-cfg")).match("cfg.json");return r?r.json():null};
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("ai5-tt-")&&x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))))});
// Every push MUST show a notification, otherwise browsers throttle or drop the subscription.
self.addEventListener("push",e=>e.waitUntil((async()=>{
    const cfg=(await cfgGet())||{b:"A51",s:"A5A"};
    const a=alertFor(cfg,new Date(),5)||{tag:"alerts-ok",title:"✅ Alerts are working",body:"You'll get a reminder 10 min before each of your lectures."};
    await self.registration.showNotification(a.title,{body:a.body,tag:a.tag,icon:"icon-192.png",badge:"icon-192.png",vibrate:[200,100,200]});
})()));
// If the browser rotates/expires the push subscription, quietly renew it and tell the server.
self.addEventListener("pushsubscriptionchange",e=>e.waitUntil((async()=>{
    const c=await cfgGet();if(!c||!c.worker||!c.key)return;
    const sub=await self.registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:Uint8Array.from(atob(c.key.replace(/-/g,"+").replace(/_/g,"/")),x=>x.charCodeAt(0))});
    await fetch(c.worker+"/sub",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({endpoint:sub.endpoint,b:c.b,s:c.s})});
})()));
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window"}).then(l=>l.length?l[0].focus():clients.openWindow("./")))});
