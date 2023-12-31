const {
  describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  getDeviceType, getLayoutId,
} = require('./layout');

const { tokenString, generateString, logger, URL } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  name: generateString(),
  deviceType: getDeviceType(),
  webLayout: {
    layout: [{
      PORTRAIT: [{
        i: 'FLAGS-01',
        label: 'FLAGS',
        x: 0,
        y: 0,
        w: 8,
        h: 8,
        minW: 2,
        minH: 2,
        static: true,
        hasPermission: true,
      }],
      LANDSCAPE: [{
        i: 'FLAGS-01',
        label: 'FLAGS',
        x: 0,
        y: 0,
        w: 8,
        h: 8,
        minW: 2,
        minH: 2,
        static: true,
        hasPermission: true,
      }],
    }],
  },
};

const expected = expect.objectContaining({
  code: expect.any(String),
  data: expect.any(Object),
  message: expect.any(String),
});

describe('Should Check Layout Api', () => {
  test('should add layout', async () => {
    const token = await tokenString();
    const result = await request(URL).post('/layouts').set({ Authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should add layout', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add layout');
  });

  test('should update layout', async () => {
    const token = await tokenString();
    const id = await getLayoutId();
    const result = await request(URL).put(`/layouts/${id}`).set({ Authorization: `Bearer ${token}` }).send({
      name: data.name,
      deviceType: data.deviceType,
    });
    if (result.statusCode !== 200) {
      logger.error('should update layout', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update layout');
  });

  test('should delete layout', async () => {
    const token = await tokenString();
    const id = await getLayoutId();
    const result = await request(URL).delete(`/layouts/${id}`).set({ Authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete layout', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete layout');
  });
});
