const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
    getColor, getLedProfileId,
} = require('./led-profile');

const { tokenString, generateString } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const getObj = async () => {
    const colors = await getColor();
    const data = {
        name: generateString(4, 4),
        colorCodeArray: [
            {
                code: generateString(5, 5),
                color: colors,
            }
        ]
    };
    return data;
};

const expected = {
    name: expect.any(String),
    colorCodeArray: expect.any(Array),
};

describe('Should Check Led-profile Api', () => {
    test('should add led-profile', async () => {
        const token = await tokenString();
        const data = await getObj();

        const result = await request(url).post('/led-color-profile').set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('should update led-profile', async () => {
        const Id = await getLedProfileId();
        const data = await getObj();
        const token = await tokenString();

        const result = await request(url).put(`/led-color-profile/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('should delete led-profile', async () => {
        const Id = await getLedProfileId();
        const token = await tokenString();

        const result = await request(url).delete(`/led-color-profile/${Id}`).set({ authorization: `Bearer ${token}` });
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ success: true });
    });
});
