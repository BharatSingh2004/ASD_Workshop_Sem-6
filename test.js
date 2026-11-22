const request = require('supertest');
const app = require('./index');
const assert = require('assert');

async function runTests() {
  console.log('Running tests...');

  // Test 0: GET / should return 200 and API info
  let res = await request(app).get('/');
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.status, 'ok');
  console.log('Test 0 passed (Root GET /)');

  // Test 1: GET /products should return MISS
  res = await request(app).get('/products');
  assert.strictEqual(res.headers['x-cache'], 'MISS');
  assert.strictEqual(res.body.length, 2);
  console.log('Test 1 passed');

  // Test 2: GET /products should return HIT
  res = await request(app).get('/products');
  assert.strictEqual(res.headers['x-cache'], 'HIT');
  assert.strictEqual(res.body.length, 2);
  console.log('Test 2 passed');

  // Test 3: POST /products should invalidate cache
  res = await request(app).post('/products').send({ name: 'Product 3', price: 300 });
  assert.strictEqual(res.statusCode, 201);
  console.log('Test 3 passed');

  // Test 4: GET /products should return MISS again because cache was invalidated
  res = await request(app).get('/products');
  assert.strictEqual(res.headers['x-cache'], 'MISS');
  assert.strictEqual(res.body.length, 3);
  console.log('Test 4 passed');

  // Test 5: GET /products/:id should MISS then HIT
  res = await request(app).get('/products/1');
  assert.strictEqual(res.headers['x-cache'], 'MISS');
  res = await request(app).get('/products/1');
  assert.strictEqual(res.headers['x-cache'], 'HIT');
  console.log('Test 5 passed');

  // Test 6: Input validation on POST /products
  res = await request(app).post('/products').send({ name: '' });
  assert.strictEqual(res.statusCode, 400);
  console.log('Test 6 passed (Validation)');

  // Test 7: 404 handler for unknown routes
  res = await request(app).get('/non-existent-route');
  assert.strictEqual(res.statusCode, 404);
  assert.strictEqual(res.body.error, 'Not Found');
  console.log('Test 7 passed (404 Handler)');

  console.log('All tests passed successfully!');
}

runTests().catch((err) => {
  console.error('Tests failed:', err);
  process.exit(1);
});
