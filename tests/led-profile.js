const phin = require('phin');
const { tokenString } = require('./common');
async function getColor() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/master?code=LED_Pattern_Color',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const arrOfData = JSON.parse(response.body);
        const indexNumber = Math.floor(Math.random() * arrOfData.length);
        const result = arrOfData[indexNumber].name;
        return result;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getLedProfileId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/led-color-profile',
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
            throw new Error('Specific data not found, please add led-profile first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    getColor, getLedProfileId,
};
