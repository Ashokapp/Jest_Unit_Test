const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getBedId, getGenderCode, getPatientId,
} = require('./patient');

const { tokenString, generateString, generateRandomNumber } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObj = async () => {
  const Id = await getBedId();
  const genderCode = await getGenderCode();
  const data = {
    age: generateRandomNumber(50),
    anonymous: Math.random() > 0.5 ? true : false,
    bed: Id,
    currentVisitId: generateString(),
    discharged: false,
    firstName: generateString(8, 8),
    gender: genderCode,
    lastName: generateString(8, 8),
    patientId: generateString(),
    // isBaby: Math.random() > 0.5 ? true : false,
    // babies: isBaby ? [{ babyName: generateString(4, 4), babyGender: genderCode }] : '',
  };
  return data;
};

const expected = {
  age: expect.any(Number),
  currentVisitId: expect.any(String),
  firstName: expect.any(String),
  gender: expect.any(String),
  lastName: expect.any(String),
  patientId: expect.any(String),
  status: expect.any(String),
};

describe('Should Check Patients Api', () => {
  test('should admit patient', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(url).post('/patients').set({ authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update patient detail', async () => {
    const token = await tokenString();
    const Id = await getPatientId();
    const data = await getObj();
    const result = await request(url).put(`/patients/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should discharge patient', async () => {
    const token = await tokenString();
    const Id = await getPatientId();
    const result = await request(url).delete(`/patients/${Id}`).set({ authorization: `Bearer ${token}` });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
  });
});
