const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
    getTypeOfPPE, getPPEId,
} = require('./ppe-category');

const { tokenString, generateString, generateRandomNumber, logger } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const getObj = async () => {
    const typeOfPPE = await getTypeOfPPE();
    const data = {
        name: generateString(),
        icon: "static.jpeg",
        ppeType: typeOfPPE,
        priority: generateRandomNumber(5)
    };
    return data;
}

const expected = expect.objectContaining({
    name: expect.any(String),
    icon: expect.any(String),
    ppeType: expect.any(String),
    priority: expect.any(Number),
})

describe('Should Check PPE-Category Api', () => {
    test('should add PPE-Category', async () => {
        const token = await tokenString();
        const data = await getObj();

        const result = await request(url).post('/ppe-categories').set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('should add PPE-Category', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('should add PPE-Category', result.body);
    });

    test('Should Update PPE-Category', async () => {
        const Id = await getPPEId();
        const data = await getObj();
        const token = await tokenString();

        const result = await request(url).put(`/ppe-categories/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data);
        if (result.statusCode !== 200) {
            logger.error('Should Update PPE-Category', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
        logger.info('Should Update PPE-Category', result.body);
    });

    test('Should Delete PPE-Category', async () => {
        const Id = await getPPEId();
        const token = await tokenString();

        const result = await request(url).delete(`/ppe-categories/${Id}`).set({ authorization: `Bearer ${token}` });
        if (result.statusCode !== 200) {
            logger.error('Should Delete PPE-Category', result.body);
        }
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
        logger.info('Should Delete PPE-Category', result.body);
    });
});
