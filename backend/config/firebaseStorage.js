const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const environment = {
    projectId: process.env.PROJECT_ID,
    appId: process.env.APP_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

initializeApp(environment);

const storage = getStorage();

module.exports = storage;

