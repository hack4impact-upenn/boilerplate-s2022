import request from 'supertest';
import { createServer, setExpressSession } from '../../config/createServer';

const app = createServer(); // instantiate express app
let server = app.listen(); // listen on some unused port
let agent = request.agent(server); // instantiate supertest agent

beforeAll(async () => {
  setExpressSession(app); // reset session to use mock db for storage
});

it('logging out before logging in should return a 400', async () => {
  const response = await agent!.post('/api/auth/logout');
  console.log('got response: ', response.body);
  console.log('got status', response.status);
  expect(response.status).toBe(400);
});

it('registering new user issues 201 status code and registering existing user issues 400 status code', async () => {
  let response = await agent.post('/api/auth/register').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(201);
  response = await agent.post('/api/auth/register').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(400);
});

it('successful login should give 200 status code', async () => {
  let response = await agent.post('/api/auth/register').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(201);
  response = await agent.post('/api/auth/login').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(200);
  return;
});

it('incorect password should give 401 status', async () => {
  let response = await agent.post('/api/auth/register').send({
    email: 'example@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(201);
  response = await agent.post('/api/auth/login').send({
    email: 'example@gmail.com',
    password: 'hack4impact',
  });
  expect(response.status).toBe(401);
});

it('test register, login, logout', async () => {
  let response = await agent.post('/api/auth/register').send({
    email: 'example2@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(201);
  response = await agent.post('/api/auth/login').send({
    email: 'example2@gmail.com',
    password: 'Hack4Impact',
  });
  expect(response.status).toBe(200);
  response = await agent.post('/api/auth/logout');
  expect(response.status).toBe(200);
});
