const phin = require('phin');

const { tokenString } = require('./common');

async function getDigestId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/daily-digest',
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
            throw new Error('Specific data not found, please add daily-digest first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function getStats() {
    let results = [];
    const length = Math.ceil(Math.random() * 5);
    const data = ['NURSE_CALLS_RAISED_COUNT', 'NURSE_CALLS_ATTENDED_COUNT', 'NURSE_CALLS_RAISED_ERROR_COUNT', 'PATIENT_CHECKED_IN_COUNT', 'PATIENT_CHECKED_OUT_COUNT'];
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * data.length);
        results.push(data[index]);
    }
    return results;
}

module.exports = {
    getStats, getDigestId
};
