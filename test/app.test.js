// test/app.test.js
import request from 'supertest';
import app from '../index.js';

describe('GET /', () => {
  it('responds with hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from DevOps Demo');
  });
});