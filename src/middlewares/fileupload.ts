import {Request} from 'express';
import multer, {FileFilterCallback} from 'multer';

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

const upload = multer({dest: 'tmp/', fileFilter: fileFilter});

export default upload.single('file');
