const {
  expect, test, describe, afterEach, beforeEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  roomStatusId, getLedPattern, getLayout, getRoomType,
} = require('./room-status');

const {
  tokenString, generateString, toUpperCase, generateRandomNumber, generateHexCode,
} = require('./common');

beforeEach(() => {
  console.log('before calling');
});

afterEach(() => {
  console.log('after calling');
});

const str = generateString(7, 7);

const getObj = async () => {
  const layout = await getLayout();
  const ledData = await getLedPattern();
  const typeOfRoom = await getRoomType();
  const data = {
    background: generateHexCode(),
    dbLayout: layout.dbName,
    ledPattern: ledData,
    pbLayout: layout.pbName,
    flag: toUpperCase(str),
    foreground: generateHexCode(),
    message: toUpperCase(str),
    roomListPriority: generateRandomNumber(),
    roomType: typeOfRoom,
  };
  return data;
}

const expected = {
  _id: expect.any(String),
  background: expect.any(String),
  flag: expect.any(String),
  foreground: expect.any(String),
  message: expect.any(String),
  roomListPriority: expect.any(Number),
  roomType: expect.any(String),
};

describe('Should Check Room-Status Api', () => {
  test('should add room-status', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(url).post('/predefinedstatus').set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update room-status', async () => {
    const token = await tokenString();
    const Id = await roomStatusId();
    const data = await getObj();
    const result = await request(url).put(`/predefinedstatus/${Id}`).set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete room-status', async () => {
    const token = await tokenString();
    const Id = await roomStatusId();
    const result = await request(url).delete(`/predefinedstatus/${Id}`).set({ Authorization: `Bearer ${token}` });
    if (result.body.success) {
      console.log(result.body);
      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({ success: true });
      return;
    }
    expect(result.status).toBe(500);
  });
});
