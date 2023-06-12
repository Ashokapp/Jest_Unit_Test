const phin = require('phin');

const { tokenString } = require('./common');

async function getAlertId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/alerts-v2',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = await arrOfData.filter((element) => element.name.startsWith('TEST'));
    if (specificData) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getLedPattern() {
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
    const index = Math.floor(Math.random() * arrOfData.length);
    const result = arrOfData[index]._id;
    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function selectType() {
  const data = Math.floor(Math.random() * 1) ? 'REQUEST' : 'NOTIFICATION';
  return data;
}

function locationInfo() {
  const data = Math.floor(Math.random() * 1) ? 'STANDARD' : 'BROADCAST';
  return data;
}

function displayType() {
  const data = Math.floor(Math.random() * 1) ? 'STANDARD' : 'OVERLAY';
  return data;
}

function getSenderType() {
  const data = ['EHR', 'JERON', 'NURSE_CALL', 'RAULAND', 'RTLS', 'SMART_BED', 'SVC_REQUEST', 'VITALS'];
  const index = Math.floor(Math.random() * data.length);
  const result = data[index];
  return result;
}

function getAlertType() {
  const data = ['NURSE_CALL', 'RTLS', 'SERVICE_REQUEST'];
  const index = Math.floor(Math.random() * data.length);
  const result = data[index];
  return result;
}

function getBoards() {
  const data = ['ALL BOARDS', 'PATIENTBOARD', 'NURSEBOARD', 'DOORBOARD'];
  const index = Math.floor(Math.random() * data.length);
  const result = `["${data[index]}"]`;
  return result;
}

module.exports = {
  getAlertId,
  selectType,
  locationInfo,
  displayType,
  getLedPattern,
  getSenderType,
  getAlertType,
  getBoards,
};
