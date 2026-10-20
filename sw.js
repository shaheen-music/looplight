/* Looplight service worker: opens the newest page whenever you are online (falling back to the saved copy if the network is slow or away), so it also works offline */
const CACHE='looplight-v24';
const FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','samples/koto.js','samples/shaku.js','samples/taiko.js','samples/flute.js','samples/erhu.js','samples/sax.js','samples/saxv.js','samples/dtr.js','samples/piano.js','samples/bass.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(!r.ok)throw new Error(f);return c.put(f,r);})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
/* the page asks which build is running so it can tell whether it is out of date */
self.addEventListener('message',e=>{if(e.data==='version'&&e.source)e.source.postMessage({version:CACHE});});

function save(r,res){if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{});}return res;}
/* page and manifest: ask the network first (it only re-sends if the file changed); if that takes over 2.5 s or fails, use the saved copy */
function newestFirst(r){
  return new Promise(resolve=>{
    let settled=false;
    const useSaved=()=>caches.match(r,{ignoreSearch:true}).then(hit=>{if(hit&&!settled){settled=true;resolve(hit);}return hit;});
    const timer=setTimeout(useSaved,2500);
    fetch(r,{cache:'no-cache'}).then(res=>{clearTimeout(timer);save(r,res);if(!settled){settled=true;resolve(res);}})
      .catch(()=>{clearTimeout(timer);useSaved().then(hit=>{if(!hit&&!settled){settled=true;resolve(Response.error());}});});
  });
}
/* icons and other files rarely change: use the saved copy at once */
function savedFirst(r){return caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>save(r,res)));}

self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  const page=r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')||u.pathname.endsWith('.webmanifest');
  e.respondWith(page?newestFirst(r):savedFirst(r));
});
