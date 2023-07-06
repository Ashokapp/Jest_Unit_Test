const phin = require('phin');

const { tokenString, logger } = require('./common');

function flagType_visibility() {
  try {
    const data = ['Allergy', 'Order', 'Dietary', 'General'];
    const index = Math.floor(Math.random() * data.length);
    const flagType = data[index];
    let boardVisibility = null;

    if (flagType === 'Allergy' || flagType === 'Order') {
      const boardData = ["PATIENTBOARD", "DOORBOARD", "NURSEBOARD"];
      const boardIndex = Math.floor(Math.random() * boardData.length);
      boardVisibility = `["${boardData[boardIndex]}"]`;
    }
    return { flagType, boardVisibility };
  } catch (error) {
    logger.error(error);
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
    logger.error(error);
  }
}

async function getFlagId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/patientFlags',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.displayName.startsWith('TEST'));
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

module.exports = {
  flagType_visibility,
  getLedPattern,
  getFlagId,
};
