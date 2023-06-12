const phin = require('phin');

const { tokenString } = require('./common');

async function roomStatusId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/predefinedstatus',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.flag.startsWith('TEST'));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      throw new Error('Specific data not found, please add data first');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getLedPattern() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/led-pattern',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const index = Math.floor(Math.random() * arrOfData.length);
    const result = arrOfData[index]._id;

    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getRoomType() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/master?code=ROOM_TYPE',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const index = Math.floor(Math.random() * arrOfData.length);
    const result = arrOfData[index].code;

    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getLayout() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/layouts',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const pbData = arrOfData.filter((element) => element.deviceType === 'PATIENTBOARD');
    const dbData = arrOfData.filter((element) => element.deviceType === 'DOORBOARD');
    const pbIndex = Math.floor(Math.random() * pbData.length);
    const dbIndex = Math.floor(Math.random() * dbData.length);

    const pbName = pbData[pbIndex]._id;
    const dbName = dbData[dbIndex]._id;

    return { pbName, dbName };
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
  roomStatusId,
  getLedPattern,
  getLayout,
  getRoomType,
};
