import express from 'express';
import request from 'supertest';
import { Server } from 'http';
import MongoStore from 'connect-mongo';
import MongoConnection from '../../config/MongoConnection';
import createExpressApp from '../../config/createExpressApp';
import StatusCode from '../../config/StatusCode';
import { User } from '../../models/user';

let dbConnection: MongoConnection;
let sessionStore: MongoStore;
let app: express.Express;
let server: Server;
let agent: request.SuperAgentTest;

const testEmail = 'example@gmail.com';
const testPassword = '123456';
const testFirstName = 'testFirst';
const testLastName = 'testLast';

beforeAll(async () => {
  // connects to an in memory database since this is a testing environment
  dbConnection = await MongoConnection.getInstance();
  dbConnection.open();

  sessionStore = dbConnection.createSessionStore(); // for storing user sessions in the db
  app = createExpressApp(sessionStore); // instantiate express app
  server = app.listen(); // instantiate server to listen on some unused port
  agent = request.agent(server); // instantiate supertest agent
});

beforeEach(async () => {
  dbConnection.clearInMemoryCollections(); // so db is cleared in between tests
});

afterAll(async () => {
  sessionStore.close();
  dbConnection.close();
});

it('logging out before logging in should return a 401', async () => {
  const response = await agent!.post('/api/auth/logout');
  console.log('got response: ', response.body);
  console.log('got status', response.status);
  expect(response.status).toBe(StatusCode.UNAUTHORIZED);
});

it('registering new user issues 201 status code and registering existing user issues 400 status code', async () => {
  // Register user and expect 201
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(201);
  // Check for user in db
  const user = await User.findOne({ email: testEmail });
  expect(user).toBeTruthy();
  // TODO: Make sure there's no sessions yet because no login

  // Register user again and expect 400
  response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(400);
});

it('successful login should give 200 status code and create session', async () => {
  // Register user and expect 201
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(201);
  // Login user and expect 200
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: testPassword,
  });
  expect(response.status).toBe(200);
  // TODO: Make sure there's a session now
});

it('incorect password should give 401 status', async () => {
  // Register user and expect 201
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(201);
  // Check for user in db
  const user = await User.findOne({ email: testEmail });
  expect(user).toBeTruthy();
  // Try to login with wrong password and expect 401
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: 'hack4impact',
  });
  expect(response.status).toBe(401);
  // TODO: Make sure no sessions were created
});

it('test register, login, logout', async () => {
  // Register user and expect 201
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(201);
  // Check for user in db
  const user = await User.findOne({ email: testEmail });
  expect(user).toBeTruthy();
  // Login user and expect 200
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: testPassword,
  });
  expect(response.status).toBe(200);
  // TODO: Make sure there's a session now
  // Logout user and expect 200
  response = await agent.post('/api/auth/logout');
  expect(response.status).toBe(200);
  // TODO: Make sure there's no sessions now
});
