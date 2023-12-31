const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const { getBgImageId } = require('./bg-image');

const { tokenString, generateString, logger, URL } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  name: generateString(8, 8),
  image: 'backgroundImage.png',
};

const expected = expect.objectContaining({
  code: expect.any(String),
  message: expect.any(String),
  data: expect.objectContaining({
    name: expect.any(String),
    image: expect.any(String),
  }),
})


describe('Should Check Background-Images Api', () => {
  test('should add background-image', async () => {
    const token = await tokenString();

    const result = await request(URL).post('/background-image').set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should add background-image', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add background-image');
  });

  test('should update background-image', async () => {
    const token = await tokenString();
    const Id = await getBgImageId();
    const result = await request(URL).put(`/background-image/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data.name);
    if (result.statusCode !== 200) {
      logger.error('should update background-image', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update background-image');
  });

  test('should delete background-image', async () => {
    const token = await tokenString();

    const Id = await getBgImageId();
    const result = await request(URL).delete(`/background-image/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete background-image', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should delete background-image');
  });
});
