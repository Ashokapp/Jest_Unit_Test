const phin = require('phin');

const { tokenString, logger } = require('./common');

async function getBedId() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/rooms/empty-rooms',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.teemsRoomId && element.teemsRoomId.startsWith('TEST'));

    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index].beds[0];
      return result;
    }
  } catch (error) {
    logger.error(error);
  }
}

async function getGenderCode() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/master?code=GENDER',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = JSON.parse(response.body);
    const index = Math.floor(Math.random() * result.length);
    const data = result[index].code;
    return data;
  } catch (error) {
    logger.error(error);
  }
}

async function getPatientId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/patients',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => (element.patientId && element.patientId.startsWith('P')) || (element.firstName && element.firstName.startsWith('TEST')));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getBedId, getGenderCode, getPatientId,
};
