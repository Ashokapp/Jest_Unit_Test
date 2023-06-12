const phin = require('phin');

const { tokenString } = require('./common');

function getDeviceType() {
  const data = ['PATIENTBOARD', 'DOORBOARD', 'NURSEBOARD', 'CUSTOMBOARD'];
  const index = Math.floor(Math.random() * data.length);
  return data[index];
}

async function getLayoutId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/layouts',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token} `,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.name.startsWith('TEST'));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      throw new Error('Specific data not found, please add layout first');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
  getDeviceType, getLayoutId,
};