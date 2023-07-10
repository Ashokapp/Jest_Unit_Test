const {
  expect, test, describe, afterEach, beforeEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  roomStatusId, getLedPattern, getLayout, getRoomType,
} = require('./room-status');

const {
  tokenString, generateString, toUpperCase, generateRandomNumber, generateHexCode, logger, URL
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

const expected = expect.objectContaining({
  _id: expect.any(String),
  background: expect.any(String),
  flag: expect.any(String),
  foreground: expect.any(String),
  message: expect.any(String),
  roomListPriority: expect.any(Number),
  roomType: expect.any(String),
})

describe('Should Check Room-Status Api', () => {
  test('should add room-status', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(URL).post('/predefinedstatus').set({ Authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should add room-status', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add room-status');
  });

  test('should update room-status', async () => {
    const token = await tokenString();
    const Id = await roomStatusId();
    const data = await getObj();
    const result = await request(URL).put(`/predefinedstatus/${Id}`).set({ Authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should update room-status', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update room-status');
  });

  test('should delete room-status', async () => {
    const token = await tokenString();
    const Id = await roomStatusId();
    const result = await request(URL).delete(`/predefinedstatus/${Id}`).set({ Authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete room-status', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete room-status');
  });
});
