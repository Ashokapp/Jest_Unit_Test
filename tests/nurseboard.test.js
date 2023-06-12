const {
  expect, test, describe, afterEach, beforeEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getBedId, getNurseboardId,
} = require('./nurseboard');

const { tokenString, generateString } = require('./common');

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

const expected = {
  _id: expect.any(String),
  deviceId: expect.any(String),
  MDMDeviceID: expect.any(String),
  MDMDeviceURL: expect.any(String),
  beds: expect.any(Array),
};

describe('Should Check Nurse-Board Api', () => {
  test('should add nurse-board', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(url).post('/nurseboards').set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update nurse-board', async () => {
    const token = await tokenString();
    const data = await getObj();
    const Id = await getNurseboardId();
    const result = await request(url).put(`/nurseboards/${Id}`).set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete nurse-board', async () => {
    const token = await tokenString();
    const data = await getObj();
    const Id = await getNurseboardId();
    const result = await request(url).delete(`/nurseboards/${Id}`).set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
  });
});
