const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    SaveUpdateBarRouter,
    GetAllBarRouter,
    GetSingleBarRouter,
    DeleteBarRouter,
    handleFileUpload
} = require('../Controller/BarController'); // Adjust the path as needed

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Create uploads directory if it doesn't exist
  const fs = require('fs');
  const dir = './uploads';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

router.post('/', SaveUpdateBarRouter);
router.get('/:UserId', GetAllBarRouter);
router.get('/', GetSingleBarRouter); // :id is a URL parameter
router.delete('/', DeleteBarRouter);
router.post('/uploadfile', handleFileUpload);

module.exports = router;
