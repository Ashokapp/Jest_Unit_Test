const phin = require('phin');
const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config();

const randomEmail = require('random-email');

randomEmail({ domain: 'example.com' });

const URL = `http://${process.env.IP}:3001/api`;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...rest }) => {
      const logData = {
        level,
        message,
        timestamp,
        ...rest,
      };

      if (logData.text) {
        const parsedData = JSON.parse(logData.text);
        const convertedLog = {
          ...logData,
          text: parsedData.error
        };
        return JSON.stringify(convertedLog, null, 2) + ',';
      }

      return JSON.stringify(logData, null, 2) + ',';

    }),
  ),

  transports: [
    new winston.transports.File({
      filename: 'fail-test.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'All-test.log',
      level: 'info',
    }),
    new winston.transports.Console(),
  ]
});

async function tokenString() {
  try {
    const response = await phin({
      url: `${URL}/auth/login`,
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
    logger.error(error);
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

function getString(max = 7, min = 7) {
  let result = '';

  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
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
  const data = `${generateRandomNumber(5)}${getString(2, 2)}^${generateRandomNumber(300, 100)}^${generateRandomNumber(5)}^^^^^^`
  return data.toUpperCase();
}

function getDateTime(hour = 0) {
  let today = new Date();
  today.setHours(today.getHours() + hour);
  return today;
}

function getNumberWithCode() {
  let Number = '+';
  for (let i = 0; i < 12; i++) {
    const index = Math.floor(Math.random() * 9);
    Number += index;
  }
  return Number;
}

module.exports = {
  tokenString,
  generateString,
  generateRandomNumber,
  toUpperCase,
  generateHexCode,
  generateLocationString,
  getDateTime,
  randomEmail,
  getNumberWithCode,
  getString,
  logger,
  URL,
};
