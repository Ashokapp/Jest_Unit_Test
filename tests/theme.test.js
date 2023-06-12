const {
  describe, test, expect, beforeEach, afterEach,
} = require('@jest/globals');

const request = require('supertest');

const url = 'http://localhost:3001/api';

const {
  getThemeById,
} = require('./theme');

const { tokenString, generateString } = require('./common');

beforeEach(async () => {
  console.log('Before calling');
});

afterEach(async () => {
  console.log('After calling');
});

const data = {
  name: generateString(6, 6),
  deviceType: 'PATIENTBOARD',
  webTheme: {
    PATIENTBOARD: {
      global: {
        fontFamily: 'Roboto',
        mainContainer: {
          light: {
            root: { common: { backgroundColor: 'rgba(227, 255, 228, 0.3)', color: 'rgba(0,0,0,1)', boxShadow: 5 } },
            title: {
              common: {
                color: 'rgba(255,255,255,1)', textAlign: 'center', justifyContent: 'center', boxShadow: 2,
              },
            },
          },
          dark: {
            root: { common: { backgroundColor: 'rgba(110,110,110,0.32)', color: 'rgba(255,255,255,1)', boxShadow: 5 } },
            title: {
              common: {
                color: 'rgba(255,255,255,1)', textAlign: 'center', justifyContent: 'center', boxShadow: 2,
              },
            },
          },
        },
        card: { light: { root: { common: { color: 'rgba(0,0,0,1)', backgroundColor: 'rgba(188, 215, 189, 0.3)', boxShadow: 4 } } }, dark: { root: { common: { color: 'rgba(255,255,255,1)', backgroundColor: 'rgba(102,102,102,0.41)', boxShadow: 4 } } } },
        primaryCustom: {
          light: {
            main: 'rgba(232, 122, 122, 1)', backgroundImage: 'background-images/Holi-1646301429652.jpg', overlayBackgroundColor: '#ffffff00', overlayBackgroundBlur: 0,
          },
          dark: {
            main: 'rgba(17,17,17,1)', backgroundImage: 'backgroundImages/darkgradient.jpeg', overlayBackgroundColor: '#ffffff00', overlayBackgroundBlur: 0,
          },
        },
      },
      modules: { footer: { navigationButton: { light: { backgroundColor: 'rgba(138, 45, 87, 0.81)', fill: 'rgba(238, 238, 238, 1)' }, dark: { fill: 'rgba(135, 58, 58, 1)', backgroundColor: 'rgba(255, 143, 143, 1)' } } } },
    },
  },
};

const expected = {
  _id: expect.any(String),
  name: expect.any(String),
  deviceType: expect.any(String),
  webTheme: expect.any(Object),
};

describe('Should Check Theme Api', () => {
  test('should add theme', async () => {
    const token = await tokenString();
    const result = await request(url).post('/themes').set({ Authorization: `Bearer ${token}` }).send(data);
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should update theme', async () => {
    const token = await tokenString();
    const themeId = await getThemeById();
    const result = await request(url).put(`/themes/${themeId}`).set({ Authorization: `Bearer ${token}` }).send({
      deviceType: data.deviceType,
    });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(expected);
  });

  test('should delete theme', async () => {
    const token = await tokenString();
    const themeId = await getThemeById();
    const result = await request(url).delete(`/themes/${themeId}`).set({ Authorization: `Bearer ${token}` });
    console.log(result.body);

    if (result.body.success) {
      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({ success: true });
      return;
    }
    expect(result.status).toBe(500);
  });
});