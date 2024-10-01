/**
 * For testing auth.controller.ts and auth.middleware.ts
 */
import express from 'express';
import request from 'supertest';
import { Server } from 'http';
import MongoStore from 'connect-mongo';
import MongoConnection from '../../config/mongoConnection.ts';
import createExpressApp from '../../config/createExpressApp.ts';
import StatusCode from '../../util/statusCode.ts';
import { User } from '../../models/user.model.ts';
import Session from '../../models/session.model.ts';

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

afterAll(async () => {
  sessionStore.close();
  dbConnection.close();
});

beforeEach(async () => {
  // Clear the database before each test
  dbConnection.clearInMemoryCollections();
});

describe('testing authentication routes', () => {
  describe('standalone calls to routes', () => {
    describe('/register', () => {
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
    });

    describe('/login', () => {
      it('login before register returns 401 UNAUTHORIZED', async () => {
        const response = await agent.post('/api/auth/login').send({
          email: testEmail,
          password: testPassword,
        });
        expect(response.status).toBe(StatusCode.UNAUTHORIZED);
        expect(await Session.countDocuments()).toBe(0);
      });
    });

    describe('/logout', () => {
      it('logging out before register + login returns 401 UNAUTHORIZED', async () => {
        const response = await agent.post('/api/auth/logout');
        expect(response.status).toBe(StatusCode.UNAUTHORIZED);
        expect(await Session.countDocuments()).toBe(0);
      });
    });
  });

  describe('once registered', () => {
    beforeEach(async () => {
      // Register user and expect 201
      const response = await agent.post('/api/auth/register').send({
        email: testEmail,
        password: testPassword,
        firstName: testFirstName,
        lastName: testLastName,
      });
      expect(response.status).toBe(StatusCode.CREATED);
      expect(await User.findOne({ email: testEmail })).toBeTruthy();
      expect(await Session.countDocuments()).toBe(0);
    });

    it('logging in with incorect credentials returns 401 UNAUTHORIZED', async () => {
      // Try to login with wrong password and expect 401 UNAUTHORIZED
      const response = await agent.post('/api/auth/login').send({
        email: testEmail,
        password: 'differentThanTestPassword',
      });
      expect(response.status).toBe(StatusCode.UNAUTHORIZED);
      expect(await Session.countDocuments()).toBe(0);
    });

    it('registering with the same email returns 400 BAD_REQUEST', async () => {
      // Register user again and expect 400
      const response = await agent.post('/api/auth/register').send({
        email: testEmail,
        password: 'differentThanTestPassword',
        firstName: testFirstName,
        lastName: testLastName,
      });
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(await Session.countDocuments()).toBe(0);
    });

    it('logging out before login returns 401 UNAUTHORIZED', async () => {
      const response = await agent.post('/api/auth/logout');
      expect(response.status).toBe(StatusCode.UNAUTHORIZED);
      expect(await Session.countDocuments()).toBe(0);
    });

    it('logging in with correct credentials returns 200 OK', async () => {
      // Login user
      const response = await agent.post('/api/auth/login').send({
        email: testEmail,
        password: testPassword,
      });
      expect(response.status).toBe(StatusCode.OK);
      expect(await Session.countDocuments()).toBe(1);
    });
  });

  describe('once logged in', () => {
    // Want to log in a user before each of these tests
    beforeEach(async () => {
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
    });

    it('logging in again returns 400 BAD_REQUEST', async () => {
      // Login again
      const response = await agent.post('/api/auth/login').send({
        email: testEmail,
        password: testPassword,
      });
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(await Session.countDocuments()).toBe(1);
    });

    it('registering any user returns 400 BAD_REQUEST', async () => {
      const response = await agent.post('/api/auth/register').send({
        email: 'differentThanTestEmail',
        password: testPassword,
        firstName: testFirstName,
        lastName: testLastName,
      });
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(await User.findOne({ email: testEmail })).toBeTruthy();
      expect(await Session.countDocuments()).toBe(1);
    });

    it('logging out returns 200 OK', async () => {
      // Logout user
      const response = await agent.post('/api/auth/logout');
      expect(response.status).toBe(StatusCode.OK);
      expect(await Session.countDocuments()).toBe(0);
    });

    it('logging out and logging in with correct credentials returns 200 OK', async () => {
      // Logout user
      let response = await agent.post('/api/auth/logout');
      expect(response.status).toBe(StatusCode.OK);
      expect(await Session.countDocuments()).toBe(0);

      // Login again
      response = await agent.post('/api/auth/login').send({
        email: testEmail,
        password: testPassword,
      });
      expect(response.status).toBe(StatusCode.OK);
      expect(await Session.countDocuments()).toBe(1);
    });

    it('logging out then register+login with new email returns 200 OK', async () => {
      // Logout user
      let response = await agent.post('/api/auth/logout');
      expect(response.status).toBe(StatusCode.OK);
      expect(await Session.countDocuments()).toBe(0);

      // Register
      response = await agent.post('/api/auth/register').send({
        email: 'differentThanTestEmail@gmail.com',
        password: testPassword,
        firstName: testFirstName,
        lastName: testLastName,
      });
      expect(response.status).toBe(StatusCode.CREATED);
      expect(await Session.countDocuments()).toBe(0);

      // Login
      response = await agent.post('/api/auth/login').send({
        email: testEmail,
        password: testPassword,
      });
      expect(response.status).toBe(StatusCode.OK);
      expect(await Session.countDocuments()).toBe(1);
    });
  });
});
