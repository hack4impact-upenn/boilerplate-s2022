import request from 'supertest';
import app from '../../../app';
import db from '../../config/database';

beforeEach(async () => {
  await db.open();
});

afterEach(async () => {
  await db.close();
});

it('should initially not be logged in', async () => {
  const response = await request(app).get('/api/auth/logout');
  expect(response.status).toBe(400);
});

it('registering existing user should give 400 status code', async () => {
  let response = await request(app).post('/api/auth/register').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(201);
  response = await request(app).post('/api/auth/register').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(400);
});

// it('successful login should give 200 status code', async () => {
//   const response = await request(app).post('/api/auth/login').send({
//     email: 'example@gmail.com',
//     password: 'Hack4Impact',
//   });
//   expect(response.status).toBe(200);
// });

// describe('POST /api/auth/register', () => {
//   it('should return 401 if password is incorrect', async () => {
//     const response = await request(app).post('/api/auth/login').send({
//       email: 'example@gmail.com',
//       password: 'Hack4Impact', // wrong password
//     });
//     console.log('response.body: ', response.body);
//     expect(response.status).toBe(401);
//   });
// });
