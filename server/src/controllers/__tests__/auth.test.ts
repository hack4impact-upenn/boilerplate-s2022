import express from 'express';
import request from 'supertest';
import { Server } from 'http';
import MongoStore from 'connect-mongo';
import MongoConnection from '../../config/MongoConnection';
import createExpressApp from '../../config/createExpressApp';
import StatusCode from '../../config/StatusCode';
import { User } from '../../models/user';
import Session from '../../models/session';

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

it('logging out before logging in returns 401 UNAUTHORIZED', async () => {
  const response = await agent!.post('/api/auth/logout');
  expect(response.status).toBe(StatusCode.UNAUTHORIZED);
});

it('registering returns 201 CREATED', async () => {
  const response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(StatusCode.CREATED);
  expect(await Session.countDocuments()).toBe(0);
  const user = await User.findOne({ email: testEmail });
  expect(user).toBeTruthy();
  expect(user?.email).toBe(testEmail);
  expect(user?.firstName).toBe(testFirstName);
  expect(user?.lastName).toBe(testLastName);
});

it('Re-registering with the same email issues 400 BAD_REQUEST', async () => {
  // Register user and expect 201
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(StatusCode.CREATED);
  expect(await User.findOne({ email: testEmail })).toBeTruthy();
  expect(await Session.countDocuments()).toBe(0);

  // Register user again and expect 400
  response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: 'diffThanTestPassword',
    firstName: 'diffThanTestFirstName',
    lastName: 'diffThanTestLastName',
  });
  expect(response.status).toBe(StatusCode.BAD_REQUEST);
  expect(await Session.countDocuments()).toBe(0);
});

it('incorect password should give 401 UNAUTHORIZED', async () => {
  // Register user and expect 201
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(StatusCode.CREATED);
  expect(await User.findOne({ email: testEmail })).toBeTruthy();
  expect(await Session.countDocuments()).toBe(0);

  // Try to login with wrong password and expect 401
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: 'hack4impact',
  });
  expect(response.status).toBe(StatusCode.UNAUTHORIZED);
  expect(await Session.countDocuments()).toBe(0);
});

it('logging in twice returns 400 BAD_REQUEST', async () => {
  // Register user
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(StatusCode.CREATED);
  expect(await User.findOne({ email: testEmail })).toBeTruthy();
  expect(await Session.countDocuments()).toBe(0);

  // Login user
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: testPassword,
  });
  expect(response.status).toBe(StatusCode.OK);
  expect(await Session.countDocuments()).toBe(1);

  // Login again
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: testPassword,
  });
  expect(response.status).toBe(StatusCode.BAD_REQUEST);
  expect(await Session.countDocuments()).toBe(1);
});

it('register, login, logout all work in succession', async () => {
  // Register user
  let response = await agent.post('/api/auth/register').send({
    email: testEmail,
    password: testPassword,
    firstName: testFirstName,
    lastName: testLastName,
  });
  expect(response.status).toBe(StatusCode.CREATED);
  expect(await User.findOne({ email: testEmail })).toBeTruthy();
  expect(await Session.countDocuments()).toBe(0);

  // Login user
  response = await agent.post('/api/auth/login').send({
    email: testEmail,
    password: testPassword,
  });
  expect(response.status).toBe(StatusCode.OK);
  expect(await Session.countDocuments()).toBe(1);

  // Logout user
  response = await agent.post('/api/auth/logout');
  expect(response.status).toBe(StatusCode.OK);
  expect(await Session.countDocuments()).toBe(0);
});
