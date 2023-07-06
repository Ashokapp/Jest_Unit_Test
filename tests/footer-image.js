const phin = require('phin');

const { tokenString, logger } = require('./common');

async function getIconId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/footerImages',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);
    const specificData = arrOfData.filter((element) => element.label.startsWith('TEST'));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      // throw new Error('Specific data not found, please add footer-image first');
      throw new Error();
    }
  } catch (error) {
    logger.error(error);
  }
}

function selectMode() {
  const mode = ['PATIENTBOARD', 'NURSEBOARD', 'DOORBOARD', 'CUSTOMBOARD'];
  const index = Math.floor(Math.random() * mode.length);
  const result = `["${mode[index]}"]`;
  return result;
}

function getVisibleOn() {
  const mode = ['PRIVATE', 'PUBLIC', 'BOTH'];
  const index = Math.floor(Math.random() * mode.length);
  const result = mode[index];
  return result;
}

function getCode() {
  const mode = ['App_Link', 'Backlight', 'Brightness', 'Chemo Button', 'Clinical Console', 'Dark to light Theme', 'Floor map', 'Home', 'Language Translation', 'Last Page', 'Light to Dark Theme', 'Media Button', 'Media Library', 'My Chart bedside app', 'Next Page', 'Previous Page', 'Relaxation Video', 'Screen Cleaning Service', 'Speech To Text', 'Video Conference', 'Volume Control', 'Web Link'];

  const index = Math.floor(Math.random() * mode.length);
  const result = mode[index];
  return result;
}

module.exports = { selectMode, getIconId, getVisibleOn, getCode };
