import assert from 'node:assert/strict';
// Run with a production server and Chrome's remote debugging port available.
// BASE_URL=http://localhost:3042 CHROME_DEBUG_URL=http://localhost:9231 node tests/maintenance-browser.mjs
const baseUrl = process.env.BASE_URL ?? 'http://localhost:3042';
const debuggerUrl = process.env.CHROME_DEBUG_URL ?? 'http://localhost:9231';
const tabs=await (await fetch(`${debuggerUrl}/json`)).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map(),errors=[];ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params)};
const call=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});
const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.result?.exceptionDetails)throw Error(JSON.stringify(r.result.exceptionDetails));return r.result?.result?.value};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function go(path){await call('Page.navigate',{url:baseUrl+path});await wait(1200);}
await call('Runtime.enable');await call('Page.enable');await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});

await call('Page.bringToFront');
for(const width of [1440,375,430]) {
 await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
 for(const plan of ['essentials','care','protect']) {
  await go('/');await wait(1500);
  await ev(`document.querySelector('.plan-cards a[href*="plan=${plan}"]').scrollIntoView({block:'center',behavior:'instant'})`);await wait(1400);
  const point=await ev(`(()=>{const el=document.querySelector('.plan-cards a[href*="plan=${plan}"]'),r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,hit:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.outerHTML}})()`);
  assert.ok(point.hit?.includes('See Pricing') || point.hit?.includes('arrow-icon'), 'CTA must receive the click');
  if(width<768){await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:point.x,y:point.y}]});await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
  else{await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});await wait(400);await call('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',clickCount:1});}
  await wait(1800);
  const result=await ev(`({url:location.href,top:document.querySelector('#plans')?.getBoundingClientRect().top,selected:document.querySelector('[class*="planSelect"][aria-pressed="true"]')?.textContent,fees:[...document.querySelectorAll('[class*="serviceLevel"] dd:last-child')].map(x=>x.textContent),scroll:scrollY})`);
  assert.ok(result.url.includes('/maintenance?plan='+plan+'#plans'));
  assert.ok(result.top>=90 && result.top<150,JSON.stringify(result));
  assert.equal(result.selected,'Your selection');
  assert.equal(await ev(`document.body.textContent.includes('Please confirm')`),false);
  console.log('PASS',width,plan,result.top);
  await call('Page.reload');await wait(1200);
  assert.ok(await ev(`Math.abs(document.querySelector('#plans').getBoundingClientRect().top-108)<3`));
 }
}
assert.equal(errors.length,0,JSON.stringify(errors));console.log('All mouse/touch clicks, reload anchors, selected states and charge copy passed.');ws.close();
