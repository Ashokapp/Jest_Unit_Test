const phin = require('phin');

const { tokenString, logger } = require('./common');

function getDeviceType() {
  const data = ['PATIENTBOARD', 'DOORBOARD', 'NURSEBOARD', 'CUSTOMBOARD', 'TEAMVIZ'];
  const index = Math.floor(Math.random() * data.length);
  return data[index];
}

async function getThemeId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/themes',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.name.startsWith('TEST'));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      // throw new Error('Specific data not found, please add theme first');
      throw new Error();
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getDeviceType, getThemeId,
};
