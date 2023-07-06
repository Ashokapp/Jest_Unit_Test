const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { getRoomWithoutBed, getBedId, getRoomId } = require('./room-beds');

const { tokenString, generateString, generateRandomNumber, generateLocationString, getString, logger } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getRoomObj = async () => {
  const roomData = {
    beds: [],
    floor: generateRandomNumber(5),
    room: generateRandomNumber(999, 100),
    roomType: 'Normal',
    teemsRoomId: generateString(5, 5),
    unit: `${generateRandomNumber(5)}${getString(2, 2)}`,
  };
  return roomData;
};

const getBedObj = async () => {
  const roomId = await getRoomWithoutBed();
  const bedData = {
    bedNo: generateRandomNumber(5),
    extension: generateString(),
    locationString: generateLocationString(),
    room: roomId,
  };
  return bedData;
};

const expected = expect.objectContaining({
  beds: expect.any(Array),
  floor: expect.any(String),
  room: expect.any(String),
  teemsRoomId: expect.any(String),
  roomType: expect.any(String),
  unit: expect.any(String),
});

describe('Should Check Rooms & Beds Api', () => {
  test('should add rooms', async () => {
    const token = await tokenString();
    const data = await getRoomObj();

    const result = await request(url).post('/rooms').set({ authorization: `Bearer ${token} ` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should add rooms', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add rooms', result.body);
  });

  test('should create beds for room', async () => {
    const token = await tokenString();
    const data = await getBedObj();
    const result = await request(url).post('/beds').set({ authorization: `Bearer ${token} ` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should create beds for room', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      bedNo: expect.any(String),
      extension: expect.any(String),
      locationString: expect.any(String),
    });
    logger.info('should create beds for room', result.body);
  });

  test('should assign beds to room', async () => {
    const token = await tokenString();
    const roomId = await getRoomWithoutBed();
    const bedId = await getBedId();
    const result = await request(url).put(`/rooms/${roomId}`).set({ authorization: `Bearer ${token} ` }).send({ beds: bedId });
    if (result.statusCode !== 200) {
      logger.error('should assign beds to room', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should assign beds to room', result.body);
  });

  test('should update rooms & beds', async () => {
    const token = await tokenString();
    const Id = await getRoomId();
    const data = await getRoomObj();
    const result = await request(url).put(`/rooms/${Id}`).set({ authorization: `Bearer ${token} ` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should update rooms & beds', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update rooms & beds', result.body);
  });

  test('should delete rooms & beds', async () => {
    const token = await tokenString();
    const Id = await getRoomId();
    const result = await request(url).delete(`/rooms/${Id}`).set({ authorization: `Bearer ${token} ` });
    if (result.statusCode !== 200) {
      logger.error('should delete rooms & beds', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete rooms & beds', result.body);
  });
});
