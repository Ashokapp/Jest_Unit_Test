const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { selectMode, getIconId, getVisibleOn, getCode } = require('./footer-image');

const { tokenString, generateString, generateRandomNumber, logger } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  mode: selectMode(),
  label: generateString(8, 8),
  priority: generateRandomNumber(),
  visibleButtonOnLayout: getVisibleOn(),
  code: getCode(),
  imageUrl: 'footer-image.png',
};

const expected = expect.objectContaining({
  mode: expect.any(Array),
  label: expect.any(String),
  priority: expect.any(String),
  code: expect.any(String),
  visibleButtonOnLayout: expect.any(String),
  imageUrl: expect.any(String),
});


describe('Should Check Footer-Icon Api', () => {
  test('should add footer-icon', async () => {
    const token = await tokenString();
    const result = await request(url).post('/footerImages').set({ authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should add footer-icon', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add footer-icon', result.body);
  });

  test('should update footer-icon', async () => {
    const token = await tokenString();
    const Id = await getIconId();
    const result = await request(url).put(`/footerImages/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should update footer-icon', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update footer-icon', result.body);
  });

  test('should delete footer-icon', async () => {
    const token = await tokenString();
    const Id = await getIconId();
    const result = await request(url).delete(`/footerImages/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete footer-icon', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete footer-icon', result.body);
  });
});
