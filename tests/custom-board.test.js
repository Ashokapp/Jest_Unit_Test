const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
    getCustomDeviceType, getCustomDeviceId,
} = require('./custom-board');

const { tokenString, generateString } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const getObj = async () => {
    const customDeviceType = await getCustomDeviceType();
    const data = {
        deviceId: generateString(8, 8),
        deviceType: customDeviceType,
        MDMDeviceID: generateString(6, 6),
        MDMDeviceURL: generateString(6, 6),
    };
    return data;
};

const expected = {
    deviceId: expect.any(String),
    deviceType: expect.any(String),
    MDMDeviceID: expect.any(String),
    MDMDeviceURL: expect.any(String),
};

describe('Should Check Custom-Device Api', () => {
    test('should add custom-device', async () => {
        const token = await tokenString();
        const data = await getObj();

        const result = await request(url).post('/custom-device').set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('should update custom-device', async () => {
        const Id = await getCustomDeviceId();
        const data = await getObj();
        const token = await tokenString();

        const result = await request(url).put(`/custom-device/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data.deviceId);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('should delete custom-device', async () => {
        const Id = await getCustomDeviceId();
        const token = await tokenString();

        const result = await request(url).delete(`/custom-device/${Id}`).set({ authorization: `Bearer ${token}` });
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toEqual({});
    });
});
