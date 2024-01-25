const express = require('express');
const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

const storage = require('../config/firebaseStorage');
const tokenValidator = require('../config/tokenValidator');
const fileModel = require('../models/fileModel');

const router = express.Router();

const SECRET = process.env.SECRET;

const upload = multer({ storage: multer.memoryStorage() });

const generateUniqueFilename = (originalname) => {
  const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
  const uniqueIdentifier = Math.random().toString(36).substring(2, 8);
  const filename = timestamp+"_"+uniqueIdentifier+"_"+originalname;
  return filename;
};

router.post('/upload', tokenValidator, upload.single('file'), (req, res, next) => {

  const metadata = {
    contentType: req.file.mimetype
  };

  const storageRef = ref(storage, 'images/' + generateUniqueFilename(req.file.originalname));
  
  const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata);

  uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  },
  async () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      req.downloadURL = downloadURL;
      next();
    });
  })

}) 

router.post('/upload', (req, res) => {

  const token = req.headers.authorization.split(" ")[1];
  const decodeToken = jwt.verify(token, SECRET);

  const data = new fileModel({
    userId: decodeToken.userId,
    mimeType: req.file.mimetype.split('/')[0],
    link: req.downloadURL,
    name: req.file.originalname
  });
  data.save()
    .then((result) => {
      res.status(201).json({ msg: 'Upload successful' });
    })
    .catch((err) => {
      res.status(400).json({ 
        error: err,
        msg: 'Upload unsuccessful'
      });
    });

})

router.get('/download', tokenValidator, async (req, res) => {

 try {
  const userId = jwt.verify(req.headers.authorization.split(" ")[1], SECRET).userId;
  const mimeType = req.query.mimeType;

  const query = {
    userId: userId,
    mimeType: mimeType
  }

  const result = await fileModel.find(query);

  res.status(200).json({ 
    files: result,
    msg: 'Fetch successful'
  })

 }
 catch(err) {
  res.status(400).json({ 
    error: err,
    msg: 'Fetch unsuccessful'
  })
 }

})

module.exports = router;