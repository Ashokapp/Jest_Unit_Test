const {
  expect, test, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  getLedPattern, getLedId,
} = require('./led-pattern');

const { tokenString, generateString, generateRandomNumber, generateHexCode, logger, URL } = require('./common');

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

const expected = expect.objectContaining({
  code: expect.any(String),
  message: expect.any(String),
  data: expect.objectContaining({
    name: expect.any(String),
    duration: expect.any(Number),
    iterations: expect.any(Number),
  })
})

describe('Should Check Led-Pattern Api', () => {
  test('should add led-pattern', async () => {
    const token = await tokenString();
    const data = await getObject();
    const result = await request(URL).post('/led-pattern').set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should add led-pattern', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add led-pattern');
  });

  test('should update led-pattern', async () => {
    const token = await tokenString();
    const data = await getObject();
    const LedId = await getLedId();
    const result = await request(URL).put(`/led-pattern/${LedId}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should update led-pattern', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update led-pattern');
  });

  test('should delete led-pattern', async () => {
    const token = await tokenString();
    const LedId = await getLedId();
    const result = await request(URL).delete(`/led-pattern/${LedId}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete led-pattern', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should delete led-pattern');
  });
});
