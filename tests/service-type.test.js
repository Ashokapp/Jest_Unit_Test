const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { getServiceId } = require('./service-type');

const { tokenString, generateString, generateRandomNumber, logger } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const data = {
    name: generateString(),
    description: generateString(12, 12),
    isDwellDurationSet: Math.random() > 0.5 ? true : false,
    dwellDuration: '',
};

data.dwellDuration = data.isDwellDurationSet ? generateRandomNumber(5) : '';

const expected = expect.objectContaining({
    name: expect.any(String),
    description: expect.any(String),
    isDwellDurationSet: expect.any(Boolean),
})

describe('Should Check Service-Type Api', () => {
    test('Should Add Service-Type', async () => {
        const token = await tokenString();

        const result = await request(url).post('/service-type').set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('Should Add Service-Type', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Add Service-Type', result.body);
    });

    test('Should Update Service-Type', async () => {
        const Id = await getServiceId();
        const token = await tokenString();

        const result = await request(url).put(`/service-type/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data.deviceId);
        if (result.statusCode !== 200) {
            logger.error('Should Update Service-Type', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Update Service-Type', result.body);
    });

    test('Should Delete Service-Type', async () => {
        const Id = await getServiceId();
        const token = await tokenString();

        const result = await request(url).delete(`/service-type/${Id}`).set({ authorization: `Bearer ${token}` });
        if (result.statusCode !== 200) {
            logger.error('Should Delete Service-Type', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
        logger.info('Should Delete Service-Type', result.body);
    });
});
