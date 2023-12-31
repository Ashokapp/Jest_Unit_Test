const {
  expect, test, describe, afterEach, beforeEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  getBedId, getNurseboardId,
} = require('./nurse-board');

const { tokenString, generateString, logger, URL } = require('./common');

beforeEach(() => {
  console.log('before calling');
});

afterEach(() => {
  console.log('after calling');
});

const getObj = async () => {
  const Id = await getBedId();
  const data = {
    deviceId: generateString(8, 8),
    MDMDeviceID: generateString(4, 4),
    MDMDeviceURL: generateString(4, 4),
    beds: Id,
  };
  return data;
};

const expected = expect.objectContaining({
  _id: expect.any(String),
  deviceId: expect.any(String),
  MDMDeviceID: expect.any(String),
  MDMDeviceURL: expect.any(String),
  beds: expect.any(Array),
})

describe('Should Check Nurse-Board Api', () => {
  test('should add nurse-board', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(URL).post('/nurseboards').set({ Authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should add nurse-board', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add nurse-board');
  });

  test('should update nurse-board', async () => {
    const token = await tokenString();
    const data = await getObj();
    const Id = await getNurseboardId();
    const result = await request(URL).put(`/nurseboards/${Id}`).set({ Authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should update nurse-board', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update nurse-board');
  });

  test('should delete nurse-board', async () => {
    const token = await tokenString();
    const data = await getObj();
    const Id = await getNurseboardId();
    const result = await request(URL).delete(`/nurseboards/${Id}`).set({ Authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should delete nurse-board', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete nurse-board');
  });
});
