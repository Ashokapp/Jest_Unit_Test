const phin = require('phin');

const { tokenString, logger } = require('./common');

async function getBgImageId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/background-image',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.name.startsWith('TEST'));
    if (specificData.length === 0) {
      throw new Error('Specific data not found, please add data first');
    }
    const index = Math.floor(Math.random() * specificData.length);
    const result = specificData[index]._id;
    return result;
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { getBgImageId };
