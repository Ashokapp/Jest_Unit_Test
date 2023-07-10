const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const { getAreaId } = require('./cleaning-area');

const { tokenString, generateString, logger, URL } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const data = {
    name: generateString(),
    description: generateString(),
};

const expected = expect.objectContaining({
    name: expect.any(String),
    description: expect.any(String),
});

describe('Should Check Cleaning-Area Api', () => {
    test('Should Add Cleaning-area', async () => {
        const token = await tokenString();

        const result = await request(URL).post('/cleaning-area').set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('Should Add Cleaning-area', result.error);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Add Cleaning-area');
    });

    test('Should Update Cleaning-Area', async () => {
        const Id = await getAreaId();
        const token = await tokenString();

        const result = await request(URL).put(`/cleaning-area/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data.description);
        if (result.statusCode !== 200) {
            logger.error('Should Update Cleaning-Area', result.error);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Update Cleaning-Area');
    });

    test('Should Delete Cleaning-Area', async () => {
        const Id = await getAreaId();
        const token = await tokenString();

        const result = await request(URL).delete(`/cleaning-area/${Id}`).set({ authorization: `Bearer ${token}` });
        if (result.statusCode !== 200) {
            logger.error('Should Delete Cleaning-Area', result.error);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
        logger.info('Should Delete Cleaning-Area');
    });
});
