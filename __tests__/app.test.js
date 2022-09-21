const request = require('supertest');
const { app } = require('../app.js');


describe('Test the rest api', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/v1/todos');

    expect(res.statusCode).toBe(200);
    expect(res.body.todos).toBeInstanceOf(Array);
  });
});
