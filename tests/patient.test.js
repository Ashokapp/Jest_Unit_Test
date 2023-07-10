const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  getBedId, getGenderCode, getPatientId,
} = require('./patient');

const { tokenString, generateString, generateRandomNumber, generateHexCode, logger, URL } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObj = async () => {
  const bedId = await getBedId();
  const genderCode = await getGenderCode();
  const babyDetail = Math.random() > 0.5 ? true : false;
  const data = {
    firstName: generateString(10, 10),
    lastName: generateString(10, 10),
    age: generateRandomNumber(60, 15),
    gender: genderCode,
    anonymous: Math.random() > 0.5 ? true : false,
    isBaby: babyDetail,
    babies: babyDetail ? [
      {
        babyName: generateString(),
        babyGender: genderCode,
        foreground: generateHexCode(),
        background: generateHexCode(),
      }
    ] : [],
    patientId: `P${generateRandomNumber(9999, 1000)}`,
    bed: bedId,
    currentVisitId: `V${generateRandomNumber(9999, 1000)}`,
    discharged: false
  };
  return data;
};

const expected = expect.objectContaining({
  firstName: expect.any(String),
  lastName: expect.any(String),
  isBaby: expect.any(Boolean),
  anonymous: expect.any(Boolean),
  patientId: expect.any(String),
  currentVisitId: expect.any(String),
})

describe('Should Check Patients Api', () => {
  test('should admit patient', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(URL).post('/patients').set({ authorization: `Bearer ${token}` }).send(data);
    if (result.statusCode !== 200) {
      logger.error('should admit patient', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should admit patient');
  });

  test('should update patient detail', async () => {
    const token = await tokenString();
    const Id = await getPatientId();
    const data = await getObj();
    const result = await request(URL).put(`/patients/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should update patient', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update patient');
  });

  test('should discharge patient', async () => {
    const token = await tokenString();
    const Id = await getPatientId();
    const result = await request(URL).delete(`/patients/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should discharge patient', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should discharge patient');
  });
});
