const phin = require('phin');

const { tokenString, logger } = require('./common');

async function getAreaId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: 'http://localhost:3001/api/cleaning-area',
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
            // throw new Error('Specific data not found, please add Cleaning-Area first');
            throw new Error();
        }
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    getAreaId,
};
