const phin = require('phin');

const { tokenString } = require('./common');

async function getManagerId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/long-term-care',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const arrOfData = JSON.parse(response.body);
        const specificData = arrOfData.filter((element) => element.patientName.startsWith('TEST'));
        if (specificData.length > 0) {
            const index = Math.floor(Math.random() * specificData.length);
            const result = specificData[index]._id;
            return result;
        } else {
            throw new Error('Specific data not found, please add Clinical-Console first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    getManagerId,
};
