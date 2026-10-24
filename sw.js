/* Looplight service worker: opens the newest page whenever you are online (falling back to the saved copy if the network is slow or away), so it also works offline */
const CACHE='looplight-v84';
const FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','samples/flute.js','samples/erhu.js','samples/dtr.js','samples/dpad.js','samples/dcry.js','samples/dbas.js','samples/dlead.js','samples/dsaw.js','samples/dl87.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(!r.ok)throw new Error(f);return c.put(f,r);})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!=='looplight-audio').map(k=>caches.delete(k)))).then(()=>caches.open('looplight-audio').then(c=>c.keys().then(rs=>Promise.all(rs.filter(r=>(r.url.indexOf('/audio/silk-bamboo/silk-')>=0||r.url.indexOf('/audio/night-drive/')>=0)).map(r=>c.delete(r)))))).catch(()=>{}).then(()=>self.clients.claim()));});
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

/* recordings: saved whole in their own cache the first time they are fetched, then played from there (with the byte-range answers a media player needs) */
async function audioResp(r){
  const c=await caches.open('looplight-audio'),key=r.url.split('#')[0];
  let hit=await c.match(key);
  if(!hit){
    const net=await fetch(key);
    if(!net.ok)return net;
    await c.put(key,net.clone());hit=await c.match(key);
  }
  const range=r.headers.get('range');
  if(!range)return hit;
  const blob=await hit.blob(),m=/bytes=(\d*)-(\d*)/.exec(range);
  if(!m)return hit;
  const size=blob.size;let a=m[1]===''?size-parseInt(m[2],10):parseInt(m[1],10),b=m[1]!==''&&m[2]!==''?parseInt(m[2],10):size-1;
  a=Math.max(0,a);b=Math.min(size-1,b);
  return new Response(blob.slice(a,b+1),{status:206,headers:{'Content-Type':'audio/mpeg','Content-Length':String(b-a+1),'Content-Range':'bytes '+a+'-'+b+'/'+size,'Accept-Ranges':'bytes'}});
}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(u.pathname.indexOf('/video/')>=0)return;
  if(u.pathname.indexOf('/audio/')>=0){e.respondWith(audioResp(r));return;}
  const page=r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')||u.pathname.endsWith('.webmanifest');
  e.respondWith(page?newestFirst(r):savedFirst(r));
});
