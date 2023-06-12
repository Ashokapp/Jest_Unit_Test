const phin = require('phin');

async function tokenString() {
  try {
    const response = await phin({
      url: 'http://localhost:3001/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'admin',
        password: 'admin123',
      },
    });
    const authToken = JSON.parse(response.body).token;
    return authToken;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function generateString(max = 7, min = 7) {
  let result = '';

  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return `TEST_${result}`;
}

function generateRandomNumber(max = 10, min = 1) {
  const data = Math.floor(Math.random() * (max - min + 1)) + min;
  return data;
}

function toUpperCase(name) {
  return name.toUpperCase();
}

function generateHexCode() {
  let hex = Math.floor(Math.random() * 16777216).toString(16);
  while (hex.length < 6) {
    hex = `0${hex}`;
  }
  return `#${hex.toUpperCase()}`;
}

function generateLocationString() {
  const data = generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9) + "^" + generateRandomNumber(9);

  return data.toUpperCase();
}

module.exports = {
  tokenString,
  generateString,
  generateRandomNumber,
  toUpperCase,
  generateHexCode,
  generateLocationString,
};
