var login = require('../auth/login');
// var functions = require('./functions');
import expressRequestMock from 'express-request-mock';
import { getMockReq, getMockRes } from '@jest-mock/express';

test('login.ts function', () => {
  expect(login).toBeDefined();
});

test('login basic test', () => {
  expect(login(getMockReq(), getMockRes())).not.toBeDefined();
});

// test('adds numbers not equal to 5', () => {
//   expect(functions.add(2, 3)).toBe(6);
// });

// test('basic login test', () => {
//   expect(functions.add(2)).not.toBe(5);
// });

// test('adds numbers not equal to 5', () => {
//   expect(functions.add(2)).not.toBe(5);
// });
