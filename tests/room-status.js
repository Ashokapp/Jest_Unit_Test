const phin = require('phin');

const { tokenString, logger, URL } = require('./common');

async function roomStatusId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: `${URL}/predefinedstatus`,
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
      // throw new Error('Specific data not found, please add data first');
      throw new Error();
    }
  } catch (error) {
    logger.error(error);
  }
}

async function getLedPattern() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: `${URL}/led-pattern`,
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
    logger.error(error);
  }
}

async function getRoomType() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: `${URL}/master?code=ROOM_TYPE`,
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
    logger.error(error);
  }
}

async function getLayout() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: `${URL}/layouts`,
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
    logger.error(error);
  }
}

module.exports = {
  roomStatusId,
  getLedPattern,
  getLayout,
  getRoomType,
};
