const {
    describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
    getConsoleType, getWorkFlowType, getConsoleId
} = require('./clinical-console');

const { tokenString, generateString, generateHexCode, getNumberWithCode } = require('./common');

beforeEach(async () => {
    console.log('Before calling');
});

afterEach(async () => {
    console.log('After calling');
});

const getObj = async () => {
    const consoleType = await getConsoleType();
    const workFlow = await getWorkFlowType();
    const data = {
        label: generateString(5, 5),
        clinicalConsoleType: consoleType,
        background: generateHexCode(),
        foreground: generateHexCode(),
        icon: "static.jpeg",
        phoneNumber: getNumberWithCode(),
        workflowType: consoleType === 'WORKFLOWS' ? workFlow : '',
        scheduleAndGoalType: Math.random() > 0.5 ? 'GOAL' : 'SCHEDULE',
    };
    return data;
}

const expected = {
    label: expect.any(String),
    clinicalConsoleType: expect.any(String),
    background: expect.any(String),
    foreground: expect.any(String),
};

describe('Should Check Clinical-Console Api', () => {
    test('should add Clinical-Console', async () => {
        const token = await tokenString();
        const data = await getObj();

        const result = await request(url).post('/clinicalconsole').set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('Should Update Clinical-Console', async () => {
        const Id = await getConsoleId();
        const data = await getObj();
        const token = await tokenString();

        const result = await request(url).put(`/clinicalconsole/${Id}`).set({ authorization: `Bearer ${token}` })
            .send(data);
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(expected);
    });

    test('Should Delete Clinical-Console', async () => {
        const Id = await getConsoleId();
        const token = await tokenString();

        const result = await request(url).delete(`/clinicalconsole/${Id}`).set({ authorization: `Bearer ${token}` });
        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({ success: true });
    });
});
