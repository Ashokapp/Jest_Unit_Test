const phin = require('phin');

const { tokenString, logger, URL } = require('./common');

async function getServiceId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: `${URL}/service-type`,
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
            // throw new Error('Specific data not found, please add Service-Type first');
            throw new Error();
        }
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    getServiceId,
};
