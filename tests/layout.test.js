const {
  describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getDeviceType, getLayoutId,
} = require('./layout');

const { tokenString, generateString } = require('./common');

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
    const result = await request(url).post('/layouts').set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update layout', async () => {
    const token = await tokenString();
    const id = await getLayoutId();
    const result = await request(url).put(`/layouts/${id}`).set({ Authorization: `Bearer ${token}` }).send({
      name: data.name,
      deviceType: data.deviceType,
    });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete layout', async () => {
    const token = await tokenString();
    const id = await getLayoutId();
    const result = await request(url).delete(`/layouts/${id}`).set({ Authorization: `Bearer ${token}` });
    if (result.body.success) {
      console.log(result.body);
      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({ success: true });
      return;
    }
    expect(result.status).toBe(500);
    expect(result.body).toMatchObject({ success: false });
  });
});
