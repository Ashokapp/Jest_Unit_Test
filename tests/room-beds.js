const phin = require('phin');

const { tokenString } = require('./common');

async function getRoomType() {
    try {
        const token = await tokenString();

        const response = await phin({
            url: 'http://localhost:3001/api/master?code=ROOM_TYPE',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = JSON.parse(response.body);
        const index = Math.floor(Math.random() * result.length);
        const data = result[index].name;

        return data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

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
        const result = JSON.parse(response.body);
        const room_without_bed = result.filter(ele => {
            return ele.beds.length == 0;
        })
        if (room_without_bed) {
            const index = Math.floor(Math.random() * room_without_bed.length);
            const roomWithoutBed = room_without_bed[index]._id;
            return roomWithoutBed;
        } else {
            throw new Error('room without bed not found, please add "room" without "bed" first');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


async function getBedId() {
    try {
        const token = await tokenString();
        const response = await phin({
            url: 'http://localhost:3001/api/beds',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const arrOfData = JSON.parse(response.body);
        const specificData = arrOfData.filter((element) => element.extension.startsWith('TEST'));
        if (specificData.length > 0) {
            const index = Math.floor(Math.random() * specificData.length);
            const result = specificData[index]._id;
            return result;
        } else {
            throw new Error('Bed not found with specific name, please add bed first');
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
        const specificData = arrOfData.filter((element) => element.unit && element.unit.startsWith('TEST'));
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

module.exports = { getRoomType, getRoomWithoutBed, getBedId, getRoomId };