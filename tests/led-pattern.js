const phin = require('phin');

const { tokenString } = require('./common');

async function getLedPattern() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/master?code=LED_Pattern_Color',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const index = Math.floor(Math.random() * arrOfData.length);
    const patternName = arrOfData[index].name;
    const patternId = arrOfData[index]._id;
    const patternHexCode = arrOfData[index].code;

    return { patternId, patternName, patternHexCode };
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getLedId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/led-pattern',
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
      throw new Error('Specific data not found, please add led-pattern first');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
  getLedPattern,
  getLedId,
};
