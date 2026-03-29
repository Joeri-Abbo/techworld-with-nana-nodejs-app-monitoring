'use strict';

const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app/server');

let server;

test('GET / returns 200', async () => {
  server = app.listen(0);
  const port = server.address().port;
  const res = await fetch(`http://localhost:${port}/`);
  assert.equal(res.status, 200);
  server.close();
});

test('GET /metrics returns 200 with Prometheus content type', async () => {
  server = app.listen(0);
  const port = server.address().port;
  const res = await fetch(`http://localhost:${port}/metrics`);
  assert.equal(res.status, 200);
  assert.ok(
    res.headers.get('content-type').includes('text/plain'),
    'Expected text/plain content type for metrics'
  );
  server.close();
});
