import {Request} from 'express';
import multer, {FileFilterCallback} from 'multer';
import util from 'util';

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (
    file.mimetype.includes('png') ||
    file.mimetype.includes('jpg') ||
    file.mimetype.includes('jpeg')
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {fileSize: 1024 * 1024 * 5}, // no larger than 5MB
}).single('file');

export default util.promisify(upload);
