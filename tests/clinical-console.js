const phin = require('phin');

const { tokenString, logger, URL } = require('./common');

async function getConsoleType() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: `${URL}/master?code=CLINICAL_CONSOLE_TYPE`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const arrOfData = JSON.parse(response.body);
        const index = Math.floor(Math.random() * arrOfData.length);
        const result = arrOfData[index].code;
        return result;
    } catch (error) {
        logger.error(error);
    }
}

async function getWorkFlowType() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: `${URL}/master?code=WORKFLOW_TYPES`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const arrOfData = JSON.parse(response.body);
        const index = Math.floor(Math.random() * arrOfData.length);
        const result = arrOfData[index].code;
        return result;
    } catch (error) {
        logger.error(error);
    }
}

async function getConsoleId() {
    try {
        const token = await tokenString();
        const response = await phin({
            method: 'GET',
            url: `${URL}/clinicalconsole`,
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
            // throw new Error('Specific data not found, please add Clinical-Console first');
            throw new Error();
        }
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    getConsoleType, getWorkFlowType, getConsoleId
};
