const phin = require('phin');

const { tokenString } = require('./common');

async function getBedId() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/rooms/empty-rooms',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = JSON.parse(response.body);
    const index = Math.floor(Math.random() * result.length);
    const data = result[index].beds[0];
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// async function getBedId() {
//   try {
//     const token = await tokenString();
//     const response = await phin({
//       url: 'http://localhost:3001/api/beds',
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const arrOfData = JSON.parse(response.body);
//     const specificData = arrOfData.filter((element) => element.extension.startsWith('TEST'));
//     if (specificData.length > 0) {
//       const index = Math.floor(Math.random() * specificData.length);
//       const result = specificData[index]._id;
//       return result;
//     } else {
//       throw new Error('Bed not found with specific name, please add bed first to admit');
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

async function getGenderCode() {
  try {
    const token = await tokenString();

    const response = await phin({
      url: 'http://localhost:3001/api/master?code=GENDER',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = JSON.parse(response.body);
    const index = Math.floor(Math.random() * result.length);
    const data = result[index].code;

    return data;
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
    const specificData = arrOfData.filter((element) => element.currentVisitId && element.currentVisitId.startsWith('TEST'));
    if (specificData.length > 0) {
      const index = Math.floor(Math.random() * specificData.length);
      const result = specificData[index]._id;
      return result;
    } else {
      throw new Error('Specific data not found, please add patient first');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
  getBedId, getGenderCode, getPatientId,
};
