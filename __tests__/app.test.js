// const request = require('supertest');
// const { app } = require('../app.js');


// describe('Test the rest api', () => {
//   const x = 12;
//   const y = 4;

//   it('should add two numbers', async () => {
//     const res = await request(app).post('/api/v1/sum').send({ x, y });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.result).toBe((x + y));
//   });

//   it('should substract two numbers', async () => {
//     const res = await request(app).post('/api/v1/subs').send({ x, y });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.result).toBe((x - y));
//   });

//   it('should multiply two numbers', async () => {
//     const res = await request(app).post('/api/v1/mult').send({ x, y });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.result).toBe((x * y));
//   });

//   it('should divide two numbers', async () => {
//     const res = await request(app).post('/api/v1/div').send({ x, y });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.result).toBe((x / y));
//   });
// });
