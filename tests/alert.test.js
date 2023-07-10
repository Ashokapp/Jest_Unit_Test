const {
  expect, test, describe, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const {
  getAlertId, selectType, locationInfo, displayType, getLedPattern, getSenderType, getAlertType, getBoards,
} = require('./alert');

const {
  tokenString, generateString, generateRandomNumber, toUpperCase, generateHexCode, logger, URL
} = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const getObj = async () => {
  const str = generateString(4, 4);
  const pattern = await getLedPattern();
  const data = {
    name: str,
    priority: generateRandomNumber(5),
    type: selectType(),
    duration: generateRandomNumber(5) * 1000,
    iterations: generateRandomNumber(5),
    text: generateString(),
    senderApplication: getSenderType(),
    showElapsed: Math.random() < 0.5 ? true : false,
    alertType: getAlertType(),
    locationType: locationInfo(),
    ledPattern: pattern,
    title: generateString(4, 4),
    isAnnouncementEnabled: Math.random() < 0.5 ? true : false,
    announcementText: generateString(4, 4),
    associatedBoards: getBoards(),
    whereToPlayAnnouncement: getBoards(),
    foregroundColor: generateHexCode(),
    backgroundColor: generateHexCode(),
    displayType: displayType(),
    code: toUpperCase(str),
  };
  return data;
};

const expected = expect.objectContaining({
  name: expect.any(String),
  priority: expect.any(Number),
  type: expect.any(String),
  senderApplication: expect.any(String),
  alertType: expect.any(String),
  locationType: expect.any(String),
  title: expect.any(String),
  foregroundColor: expect.any(String),
  backgroundColor: expect.any(String),
  displayType: expect.any(String),
  code: expect.any(String),
});

describe('Should Check Alerts Api', () => {
  test('should add Alert', async () => {
    const token = await tokenString();
    const data = await getObj();
    const result = await request(URL).post('/alerts-v2').set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should add Alert', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should add Alert');
  });

  test('should update Alert', async () => {
    const token = await tokenString();
    const Id = await getAlertId();
    const data = await getObj();
    const result = await request(URL).put(`/alerts-v2/${Id}`).set({ authorization: `Bearer ${token}` })
      .send(data);
    if (result.statusCode !== 200) {
      logger.error('should update Alert', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
    logger.info('should update Alert');
  });

  test('should delete Alert', async () => {
    const token = await tokenString();
    const Id = await getAlertId();
    const result = await request(URL).delete(`/alerts-v2/${Id}`).set({ authorization: `Bearer ${token}` });
    if (result.statusCode !== 200) {
      logger.error('should delete Alert', result.error);
    }
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ success: true });
    logger.info('should delete Alert');
  });
});
