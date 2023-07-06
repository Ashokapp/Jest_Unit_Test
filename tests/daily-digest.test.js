const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
    getStats, getDigestId,
} = require('./daily-digest');

const { tokenString, generateString, getDateTime, randomEmail, logger } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const data = {
    name: generateString(),
    data: {
        stats: getStats(),
        to: [
            randomEmail(),
        ],
        emailSubject: generateString(10, 10)
    },
    repeatInterval: getDateTime(1),
    isEnabled: false,
};

const expected = expect.objectContaining({
    name: expect.any(String),
    data: expect.objectContaining({
        stats: expect.any(Array),
        to: expect.any(Array),
        emailSubject: expect.any(String),
    })
})

describe('Should Check Daily-Digest Api', () => {
    test('should add Daily-Digest', async () => {
        const token = await tokenString();
        const result = await request(url).post('/daily-digest').set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('should add Daily-Digest', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('should add Daily-Digest', result.body);
    });

    test('Should Update Daily-Digest', async () => {
        const Id = await getDigestId();
        const token = await tokenString();

        const result = await request(url).put(`/daily-digest/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('Should Update Daily-Digest', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Update Daily-Digest', result.body);
    });

    test('Should delete Daily-Digest', async () => {
        const Id = await getDigestId();
        const token = await tokenString();

        const result = await request(url).delete(`/daily-digest/${Id}`).set({ authorization: `Bearer ${token}` });
        if (result.statusCode !== 200) {
            logger.error('Should delete Daily-Digest', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
        logger.info('Should delete Daily-Digest', result.body);
    });
});
