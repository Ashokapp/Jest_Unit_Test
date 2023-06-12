const phin = require('phin');

const { tokenString } = require('./common');

async function getMedicineId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/medicines',
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
      throw new Error('Specific data not found, please add medicine first');
    }
  } catch (error) {
    console.error('Error:', error.message);
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
    const index = Math.floor(Math.random() * arrOfData.length);
    const result = arrOfData[index]._id;

    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getSchemaId() {
  try {
    const token = await tokenString();
    const response = await phin({
      url: 'http://localhost:3001/api/patient-medication',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrOfData = JSON.parse(response.body);

    const specificData = arrOfData.filter(obj => obj.medications.medicines.some(med => med.code.startsWith('TEST')));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      throw new Error('Specific data not found, please add scheduled-medicine first');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = { getMedicineId, getPatientId, getSchemaId };
