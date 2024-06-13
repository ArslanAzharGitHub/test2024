import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: function (req, image, cb) {
    cb(null, Date.now() + image.originalname);
  }
});

const uploadFile = multer({ storage });

export default uploadFile;