const phin = require('phin');

const { tokenString } = require('./common');

async function getRoomWithoutBed() {
    try {
        const token = await tokenString();

        const response = await phin({
            url: 'http://localhost:3001/api/rooms',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const arrOfData = JSON.parse(response.body);
        const specificData = arrOfData.filter((element) => element.beds.length === 0 && element.teemsRoomId && element.teemsRoomId.startsWith('TEST'));
        if (specificData.length > 0) {
            const index = Math.floor(Math.random() * specificData.length);
            const result = specificData[index]._id;
            return result;
        } else {
            throw new Error('Specific data not found, please add room first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


async function getBedId() {
    try {
        const token = await tokenString();
        const response = await phin({
            url: 'http://localhost:3001/api/beds/not-attached-to-room',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const arrOfData = JSON.parse(response.body).data;
        if (arrOfData.length > 0) {
            const index = Math.floor(Math.random() * arrOfData.length);
            const result = arrOfData[index]._id;
            return result;
        } else {
            throw new Error('Bed not found with specific Id, please create bed first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getRoomId() {
    try {
        const token = await tokenString();
        const response = await phin({
            url: 'http://localhost:3001/api/rooms',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const arrOfData = JSON.parse(response.body);
        const specificData = arrOfData.filter((element) => element.teemsRoomId && element.teemsRoomId.startsWith('TEST'));
        if (specificData.length > 0) {
            const index = Math.floor(Math.random() * specificData.length);
            const result = specificData[index]._id;
            return result;
        } else {
            throw new Error('Room not found with specific name, please add room first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { getRoomWithoutBed, getBedId, getRoomId };