const {
  expect, test, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getMedicineId,
} = require('./medicine');

const { tokenString, generateString } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  name: generateString(6, 6),
  code: generateString(8, 8),
  imageUrl: `${generateString(4, 4)}.png`,
  isImageVisible: Math.random() > 0.5 ? true : false,
};

const expected = {
  _id: expect.any(String),
  name: expect.any(String),
  code: expect.any(String),
  imageUrl: expect.any(String),
};

describe('Should Check Medicine Api', () => {
  test('should add Medicine', async (done) => {
    const token = await tokenString();
    const result = await request(url).post('/medicines').set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    done();
  });

  test('should update Medicine', async () => {
    const token = await tokenString();
    const Id = await getMedicineId();
    const result = await request(url).put(`/medicines/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data.name);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete Medicine', async () => {
    const token = await tokenString();
    const Id = await getMedicineId();
    const result = await request(url).delete(`/medicines/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.body.success) {
      console.log(result.body);
      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({ success: true });
      return;
    }
    expect(result.status).toBe(500);
  });
});