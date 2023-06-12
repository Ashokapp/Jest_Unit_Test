const {
  describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getLedPattern, flagType_visibility, getFlagId,
} = require('./patientFlag');

const { tokenString, generateString, generateRandomNumber, generateHexCode } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObject = async () => {
  const Led = await getLedPattern();
  const { flagType, boardVisibility } = flagType_visibility();
  const data = {
    displayName: generateString(6, 6),
    name: generateString(6, 6),
    flagType: flagType,
    ledPattern: Led,
    priority: generateRandomNumber(),
    boardsVisibility: boardVisibility,
    theme: `{ "TileColor": "${generateHexCode()}", "TextColor": "${generateHexCode()}" }`,
    isAllergyFlag: Math.random() > 0.5 ? true : false,
    displayIcon: 'patientFlag.png',
  };
  return data;
};

const expected = {
  code: expect.any(String),
  message: expect.any(String),
  data: expect.objectContaining({
    displayName: expect.any(String),
    name: expect.any(String),
    priority: expect.any(Number),
    theme: expect.any(Object),
    displayIcon: expect.any(String),
  })
};

describe('Should Check patient-flag Api', () => {
  test('should add patient-flag', async () => {
    const token = await tokenString();
    const data = await getObject();
    const result = await request(url).post('/patientFlags').set({ Authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update patient-flag', async () => {
    const token = await tokenString();
    const data = await getObject();
    const Id = await getFlagId();
    const result = await request(url).put(`/patientFlags/${Id}`).set({ Authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete patient-flag', async () => {
    const token = await tokenString();
    const Id = await getFlagId();
    const result = await request(url).delete(`/patientFlags/${Id}`).set({ Authorization: `Bearer ${token}` });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });
});
