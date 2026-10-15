/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const path = require('node:path');
const filename = path.resolve('src/lib/maintenance.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const data = new Module(filename, module);
data._compile(compiled, filename);
const { readConfiguration, quotePlanOptions, sizes } = data.exports;

test('all plan, size and billing deep links retain valid quote configurations', () => {
  for (const [id, name] of [['essentials', 'Total Essentials'], ['care', 'Total Care'], ['protect', 'Total Protect']]) {
    for (const [index, size] of sizes.entries()) {
      for (const billing of ['annual', 'monthly']) {
        const config = readConfiguration(new URLSearchParams({ plan: id, size, billing }));
        assert.deepEqual(config, { selected: id, size: index, annual: billing === 'annual' });
        assert.ok(quotePlanOptions.includes(`${name} · ${size} · ${config.annual ? 'Annual' : 'Monthly'}`));
      }
    }
  }
});

test('missing, malformed and unknown query values fall back safely', () => {
  for (const query of ['', 'plan=unknown&size=1000&billing=weekly', 'plan=%3Cscript%3E&size=-1']) {
    assert.deepEqual(readConfiguration(new URLSearchParams(query)), { selected: null, size: 0, annual: true });
  }
});


test('confirmed after-hours policy is consistent in cards and comparison without fee amounts', () => {
  const { plans, comparison } = data.exports;
  assert.deepEqual(plans.map(plan => plan.afterHours), ['Applies', 'Applies', 'Waived']);
  assert.deepEqual(comparison.find(row => row[0] === 'After-hours emergency service charge'),
    ['After-hours emergency service charge', 'Applies', 'Applies', 'Waived']);
});
