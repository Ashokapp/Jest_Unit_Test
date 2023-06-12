const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { getBgImageId } = require('./bgimage');

const { tokenString, generateString } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  name: generateString(8, 8),
  image: 'backgroundImage.png',
};

const expected = {
  code: expect.any(String),
  message: expect.any(String),
  data: expect.objectContaining({
    name: expect.any(String),
    image: expect.any(String),
  }),
};

describe('Should Check Background-Images Api', () => {
  test('should add background-image', async () => {
    const token = await tokenString();

    const result = await request(url).post('/background-image').set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update background-image', async () => {
    const token = await tokenString();
    const Id = await getBgImageId();
    const result = await request(url).put(`/background-image/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data.name);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete background-image', async () => {
    const token = await tokenString();

    const Id = await getBgImageId();
    const result = await request(url).delete(`/background-image/${Id}`).set({ authorization: `Bearer ${token}` });
    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });
});
