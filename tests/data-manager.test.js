const {
    describe, test, expect, beforeEach, afterEach, globals,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
    getManagerId,
} = require('./data-manager');

const { tokenString, generateString, generateRandomNumber, logger } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const data = {
    patientName: generateString(),
    roomNumber: generateRandomNumber(300, 100),
    comment: generateString(12, 12)
};

const expected = expect.objectContaining({
    patientName: expect.any(String),
    roomNumber: expect.any(String),
    comment: expect.any(String),
})

describe('Should Check Data-Manager Api', () => {
    test('should add Data-Manager', async () => {
        const token = await tokenString();

        const result = await request(url).post('/long-term-care').set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('should add Data-Manager', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('should add Data-Manager', result.body);
    });

    test('Should Update Data-Manager', async () => {
        const Id = await getManagerId();
        const token = await tokenString();

        const result = await request(url).put(`/long-term-care/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('Should Update Data-Manager', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Update Data-Manager', result.body);
    });

    test('Should Delete Data-Manager', async () => {
        const Id = await getManagerId();
        const token = await tokenString();

        const result = await request(url).delete(`/long-term-care/${Id}`).set({ authorization: `Bearer ${token}` });
        if (result.statusCode !== 200) {
            logger.error('Should Delete Data-Manager', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
        logger.info('Should Delete Data-Manager', result.body);
    });
});
