const phin = require('phin');

const { tokenString } = require('./common');

async function getDeviceType() {
  try {
    const token = await tokenString();
    const response = await phin({
      method: 'GET',
      url: 'http://localhost:3001/api/master?code=DEVICE_TYPE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const arrOfData = JSON.parse(response.body);
    const indexNumber = Math.floor(Math.random() * arrOfData.length);
    const result = arrOfData[indexNumber].code;

    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getDevicesId() {
  try {
    const token = await tokenString();
    const response = await phin({
      method: 'GET',
      url: 'http://localhost:3001/api/devices',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.deviceId.startsWith('TEST'));

    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      throw new Error('Specific data not found, please add device first');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}


module.exports = {
  getDeviceType, getDevicesId,
};