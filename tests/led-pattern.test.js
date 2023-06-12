const {
  expect, test, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getLedPattern, getLedId,
} = require('./led-pattern');

const { tokenString, generateString, generateRandomNumber, generateHexCode } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObject = async () => {
  const patternLed = await getLedPattern();
  const data = {
    name: generateString(6, 6),
    duration: generateRandomNumber(5) * 1000,
    iterations: generateRandomNumber(),
    priority: generateRandomNumber(),
    colorNameArray: [patternLed.patternName],
    isOverlay: (Math.random() > 0.5) ? true : false,
    colorToDisplay: [{ _id: patternLed.patternId, code: patternLed.patternHexCode, name: patternLed.patternName }],
    overlayColor: generateHexCode(),
  };
  return data;
};

const expected = {
  code: expect.any(String),
  message: expect.any(String),
  data: {
    _id: expect.any(String),
    name: expect.any(String),
    duration: expect.any(Number),
    iterations: expect.any(Number),
  },
};

describe('Should Check Led-Pattern Api', () => {
  test('should add led-pattern', async (done) => {
    const token = await tokenString();
    const data = await getObject();
    const result = await request(url).post('/led-pattern').set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    done();
  });

  test('should update led-pattern', async () => {
    const token = await tokenString();
    const data = await getObject();
    const LedId = await getLedId();
    const result = await request(url).put(`/led-pattern/${LedId}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete led-pattern', async () => {
    const token = await tokenString();
    const LedId = await getLedId();
    const result = await request(url).delete(`/led-pattern/${LedId}`).set({ authorization: `Bearer ${token}` });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });
});
