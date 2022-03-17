var functions = require('../auth/passport');
import expressRequestMock from 'express-request-mock';
import { getMockReq, getMockRes } from '@jest-mock/express';

var functions = require('./functions.ts');

test('adds numbers', () => {
  expect(functions.add(2, 2)).toBe(4);
});

test('adds numbers not equal to 5', () => {
  expect(functions.add(2)).not.toBe(5);
});

test('adds numbers not equal to 5', () => {
  const options = { query: { species: 'dog' } };

  it('returns a 200 response', async () => {
    const { res } = await expressRequestMock("subject", options);
    expect(res.statusCode).toBe(200);
  });
});



