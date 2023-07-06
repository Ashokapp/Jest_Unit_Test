const {
  test, expect, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { getMedicineId, getPatientId, getSchemaId } = require('./next-schedule-medicine');

const { tokenString, logger } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObj = async () => {
  const medicine = await getMedicineId();
  const patient = await getPatientId();
  const data = {
    medications: {
      medicines: medicine,
      intakeDateTime: new Date().toISOString(),
    },
    patientId: patient,
  };
  return data;
};

const expected = expect.objectContaining({
  patientId: expect.any(String),
  medications: expect.objectContaining({
    medicines: expect.any(Array),
    intakeDateTime: expect.any(String),
  }),
})

describe('Should Check Next-Schedule-Medicine Api', () => {
  test('should add Next-Schedule-Medicine', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(url).post('/patient-medication').set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should add Next-Schedule-Medicine', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add Next-Schedule-Medicine', result.body);
  });

  test('should update Next-Schedule-Medicine', async () => {
    const token = await tokenString();
    const Id = await getSchemaId();
    const data = await getObj();
    const result = await request(url).put(`/patient-medication/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data.medications);
    if (result.statusCode !== 200) {
      logger.error('should update Next-Schedule-Medicine', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update Next-Schedule-Medicine', result.body);
  });

  test('should delete Next-Schedule-Medicine', async () => {
    const token = await tokenString();
    const Id = await getSchemaId();
    const result = await request(url).delete(`/patient-medication/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete Next-Schedule-Medicine', result.body);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete Next-Schedule-Medicine', result.body);
  });
});
