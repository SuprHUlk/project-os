const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const environment = require('../resources/firebaseStorageKey');

initializeApp(environment);

const storage = getStorage();

module.exports = storage;

