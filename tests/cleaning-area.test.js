const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const { getAreaId } = require('./cleaning-area');

const { tokenString, generateString } = require('./common');

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

const expected = {
    name: expect.any(String),
    description: expect.any(String),
};

describe('Should Check Cleaning-Area Api', () => {
    test('Should Add Service-Type', async () => {
        const token = await tokenString();

        const result = await request(url).post('/cleaning-area').set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('Should Update Cleaning-Area', async () => {
        const Id = await getAreaId();
        const token = await tokenString();

        const result = await request(url).put(`/cleaning-area/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('Should Delete Cleaning-Area', async () => {
        const Id = await getAreaId();
        const token = await tokenString();

        const result = await request(url).delete(`/cleaning-area/${Id}`).set({ authorization: `Bearer ${token}` });
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
    });
});
