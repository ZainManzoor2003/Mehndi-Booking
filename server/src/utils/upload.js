const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        cb(null, `${base}-${Date.now()}${ext}`);
    },
});

function fileFilter(req, file, cb) {
  const isImage = file.mimetype && file.mimetype.startsWith('image/');
  const isAllowedVideo = file.mimetype === 'video/mp4';
  if (isImage || isAllowedVideo) return cb(null, true);
    return cb(new Error('Invalid file type'));
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = { upload };


