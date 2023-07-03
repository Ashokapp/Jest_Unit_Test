const phin = require('phin');

const { tokenString } = require('./common');

async function getTypeOfPPE() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/master?code=PPE_ORDER_TYPES',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const arrOfData = JSON.parse(response.body);
        const index = Math.floor(Math.random() * arrOfData.length);
        const result = arrOfData[index].code;
        return result;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getPPEId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/ppe-categories',
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
            throw new Error('Specific data not found, please add PPE-Category first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    getTypeOfPPE, getPPEId
};
