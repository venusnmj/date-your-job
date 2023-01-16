import { diskStorage } from 'multer';
import path = require('path');
import * as bcrypt from 'bcrypt';

const hashFilename = (filename: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(filename, SALT);
};

export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
      const filename: string = hashFilename(path.parse(file.originalname).name);
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
