const {
  describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  getDeviceType, getDevicesId,
} = require('./device');

const { tokenString, generateString, logger, URL } = require('./common');

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

const expected = expect.objectContaining({
  deviceId: expect.any(String),
  deviceType: expect.any(String),
  MDMDeviceID: expect.any(String),
  MDMDeviceURL: expect.any(String),
})

describe('Should Check Devices Api', () => {
  test('should add device', async () => {
    const token = await tokenString();
    const data = await getObj();

    const result = await request(URL).post('/devices').set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should add device', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add device');
  });

  test('should update device data', async () => {
    const deviceId = await getDevicesId();
    const data = await getObj();
    const token = await tokenString();

    const result = await request(URL).put(`/devices/${deviceId}`).set({ authorization: `Bearer ${token}` })
      .send(data.deviceId);
    if (result.statusCode !== 200) {
      logger.error('should update device data', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update device data');
  });

  test('should delete device data', async () => {
    const deviceId = await getDevicesId();
    const token = await tokenString();

    const result = await request(URL).delete(`/devices/${deviceId}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete device data', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete device data');
  });
});
