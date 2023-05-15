import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtPayload } from 'src/core/auth/types/jwt-payload';

// File name format origianlname + userId + now Date + extention

export const AvatarInterceptor = FileInterceptor('avatar', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const user = req.user as JwtPayload;
      const name = file.originalname.split('.')[0];
      const fileExt = file.originalname.split('.')[1];
      const newFileName =
        name.split(' ').join('_') +
        '_' +
        user.userId +
        '_' +
        Date.now() +
        '.' +
        fileExt;

      cb(null, newFileName);
    },
  }),
});
