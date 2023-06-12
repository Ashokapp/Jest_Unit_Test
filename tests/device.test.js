const {
  describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getDeviceType, getDevicesId,
} = require('./device');

const { tokenString, generateString } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObj = async () => {
  const device = await getDeviceType();
  const data = {
    deviceId: generateString(8, 8),
    deviceType: device,
    MDMDeviceID: generateString(6, 6),
    MDMDeviceURL: generateString(6, 6),
  };
  return data;
};

const expected = {
  deviceId: expect.any(String),
  deviceType: expect.any(String),
  MDMDeviceID: expect.any(String),
  MDMDeviceURL: expect.any(String),
};

describe('Should Check Devices Api', () => {
  test('should add device', async () => {
    const token = await tokenString();
    const data = await getObj();

    const result = await request(url).post('/devices').set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update device data', async () => {
    const deviceId = await getDevicesId();
    const data = await getObj();
    const token = await tokenString();

    const result = await request(url).put(`/devices/${deviceId}`).set({ authorization: `Bearer ${token}` })
      .send(data.deviceId);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete device data', async () => {
    const deviceId = await getDevicesId();
    const token = await tokenString();

    const result = await request(url).delete(`/devices/${deviceId}`).set({ authorization: `Bearer ${token}` });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ success: true });
  });
});
