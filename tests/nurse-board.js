const phin = require('phin');

const { tokenString, logger, URL } = require('./common');

async function getBedId() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: `${URL}/rooms/empty-rooms`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = JSON.parse(response.body);
    const index = Math.floor(Math.random() * result.length);
    const data = result[index].beds;

    return data;
  } catch (error) {
    logger.error(error);
  }
}

async function getNurseboardId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: `${URL}/nurseboards`,
      method: 'GET',
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
      // throw new Error('Specific data not found, please add board first');
      throw new Error();
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getBedId,
  getNurseboardId,
};
