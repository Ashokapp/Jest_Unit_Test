const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { getRoomType, getRoomWithoutBed, getBedId, getRoomId } = require('./room-beds');

const { tokenString, generateString, generateRandomNumber, generateLocationString } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getRoomObj = async () => {
  const room_type = await getRoomType();
  const roomData = {
    beds: [],
    floor: generateRandomNumber(5),
    room: generateRandomNumber(500),
    roomType: room_type,
    unit: generateString(4, 4),
  };
  return roomData;
};

const getBedObj = async () => {
  const roomId = await getRoomWithoutBed();
  const bedData = {
    bedNo: generateRandomNumber(1),
    extension: generateString(),
    locationString: generateLocationString(),
    room: roomId,
    tags: { category: generateString(4, 4) },
  };
  return bedData;
};

const expected = {
  beds: expect.any(Array),
  floor: expect.any(String),
  room: expect.any(String),
  roomType: expect.any(String),
  unit: expect.any(String),
};

describe('Should Check Rooms & Beds Api', () => {
  test('should add rooms', async () => {
    const token = await tokenString();
    const data = await getRoomObj();
    const result = await request(url).post('/rooms').set({ authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should create beds for room', async () => {
    const token = await tokenString();
    const data = await getBedObj();
    const result = await request(url).post('/beds').set({ authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      bedNo: expect.any(String),
      extension: expect.any(String),
      locationString: expect.any(String),
    })
  });

  test('should add beds to room', async () => {
    const token = await tokenString();
    const roomId = await getRoomWithoutBed();
    const bedId = await getBedId();
    const result = await request(url).put(`/rooms/${roomId}`).set({ authorization: `Bearer ${token}` }).send({ beds: bedId });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update rooms & beds', async () => {
    const token = await tokenString();
    const Id = await getRoomId();
    const data = await getBedObj();
    const result = await request(url).put(`/rooms/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete rooms & beds', async () => {
    const token = await tokenString();
    const Id = await getRoomId();
    const result = await request(url).delete(`/rooms/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.body.success) {
      console.log(result.body);
      expect(result.status).toBe(200);
      return;
    }
    console.log('bed is already assign to patient so not deleting it');
    expect(result.status).not.toBe(200);
    expect(result.body).toMatchObject({ success: true });
  });
});
