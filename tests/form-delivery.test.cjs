/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const path = require('node:path');
const filename = path.resolve('src/app/api/quote/route.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const route = new Module(filename, module);
route.filename = filename;
route.paths = module.paths;
route._compile(compiled, filename);
const { POST } = route.exports;
function request(need, extra = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: 'Test', phone: '3055550100', email: 'test@example.com', address: 'Test address', need, ...extra })) data.set(key, value);
  return new Request('http://localhost/api/quote', { method: 'POST', body: data });
}
test('routes each inquiry and ignores caller-supplied destinations and provider controls', async t => {
  const calls = [];
  t.mock.method(global, 'fetch', async (url, options) => { calls.push({ url, body: JSON.parse(options.body) }); return Response.json({ success: 'true' }); });
  for (const [need, recipient] of Object.entries({ 'New install': 'power', Maintenance: 'service', 'Service or repair': 'service', 'General / other': 'contact', 'Builder inquiry': 'power' })) {
    const response = await POST(request(need, { company: 'Test company', _cc: 'unwanted@example.com', 'route-to': 'unwanted@example.com' }));
    assert.equal(response.status, 200);
    const call = calls.at(-1);
    assert.equal(call.url, `https://formsubmit.co/ajax/${recipient}@totalpowergenerators.com`);
    assert.equal(call.body._replyto, 'test@example.com');
    assert.equal(call.body._cc, undefined);
    assert.equal(call.body['route-to'], undefined);
  }
});
test('invalid input and honeypots never contact the email provider', async t => {
  const fetch = t.mock.method(global, 'fetch', async () => { throw Error('Unexpected delivery'); });
  for (const [need, extra] of [['unknown', {}], ['New install', { email: 'bad' }], ['Builder inquiry', { company: '' }], ['New install', { address: '' }]]) assert.equal((await POST(request(need, extra))).status, 400);
  assert.equal((await POST(request('New install', { _honey: 'bot' }))).status, 200);
  assert.equal(fetch.mock.callCount(), 0);
});
test('provider rejections, malformed responses and network errors are not reported as success', async t => {
  for (const result of [() => Response.json({ success: false }), () => Response.json({ success: 'false' }), () => Response.json({ success: true }, { status: 500 }), () => new Response('not json'), () => { throw Error('network unavailable'); }]) {
    const mock = t.mock.method(global, 'fetch', async () => result());
    assert.equal((await POST(request('New install'))).status, 502);
    mock.mock.restore();
  }
});

test('maintenance configuration reaches the existing service recipient unchanged', async t => {
  const plan = 'Total Care · 60–80kW · Monthly';
  let delivered;
  t.mock.method(global, 'fetch', async (url, options) => {
    delivered = { url, ...JSON.parse(options.body) };
    return Response.json({ success: true });
  });
  assert.equal((await POST(request('Maintenance', { plan }))).status, 200);
  assert.equal(delivered.plan, plan);
  assert.equal(delivered.url, 'https://formsubmit.co/ajax/service@totalpowergenerators.com');
});
