const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const filterFile = (req, file, cb) => {
  const allowedFileType = /pdf|doc|docx|ppt|pptx/;
  const extname = allowedFileType.test(path.extname(file.originalname).toLocaleLowerCase());

  if (extname) {
    return cb(null, true);
  }

  cb(new Error('File yang di upload berupa PDF, DOC, DOCX, PPT, PPTX'));
}

const upload = multer({
  storage: storage,
  fileFilter: filterFile,
  limits: {
    fileSize: 10 * 1024 * 1024 //limit file yang di upload 10mb
  }
})

module.exports = upload;