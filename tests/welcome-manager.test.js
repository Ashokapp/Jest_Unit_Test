/* eslint-disable max-len */
const {
  expect, test, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getWelcomeId,
} = require('./welcome-manager');

const { tokenString, generateString, logger } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  name: generateString(7, 7),
  title: generateString(10, 10),
  text: generateString(20, 20),
  mediaFile: 'welcome.png',
};

const expected = expect.objectContaining({
  code: expect.any(String),
  message: expect.any(String),
  data: expect.any(Object),
});


describe('Should Check Welcome-Manager Api', () => {
  test('should add welcome-manager', async () => {
    const token = await tokenString();
    const result = await request(url).post('/welcome-message').set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should add welcome-manager', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add welcome-manager', result.body);
  });

  test('should update welcome-manager', async () => {
    const token = await tokenString();
    const Id = await getWelcomeId();
    const result = await request(url).put(`/welcome-message/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should update welcome-manager', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update welcome-manager', result.body);
  });

  test('should delete welcome-manager', async () => {
    const token = await tokenString();
    const Id = await getWelcomeId();
    const result = await request(url).delete(`/welcome-message/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete welcome-manager', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should delete welcome-manager', result.body);
  });
});
