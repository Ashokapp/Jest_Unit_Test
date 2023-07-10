const phin = require('phin');

const { tokenString, logger, URL } = require('./common');

async function getDeviceType() {
  try {
    const token = await tokenString();
    const response = await phin({
      method: 'GET',
      url: `${URL}/master?code=DEVICE_TYPE`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const arrOfData = JSON.parse(response.body);
    const indexNumber = Math.floor(Math.random() * arrOfData.length);
    const result = arrOfData[indexNumber].code;

    return result;
  } catch (error) {
    logger.error(error);
  }
}

async function getDevicesId() {
  try {
    const token = await tokenString();
    const response = await phin({
      method: 'GET',
      url: `${URL}/devices`,
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
      // throw new Error('Specific data not found, please add device first');
      throw new Error();
    }
  } catch (error) {
    logger.error(error);
  }
}


module.exports = {
  getDeviceType, getDevicesId,
};
