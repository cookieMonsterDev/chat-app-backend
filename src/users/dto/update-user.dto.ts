import { UserRoles } from '@prisma/client';
import {
  IsString,
  MaxLength,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';
import { IsFile, IsFileSize, IsImage } from 'src/common/validators';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/(?=.*?[A-Z])/, {
    message: 'password must have at least 1 upper case letter',
  })
  @Matches(/(?=.*?[a-z])/, {
    message: 'password must have at least 1 lower case letter',
  })
  @Matches(/(?=.*?[0-9])/, {
    message: 'password must have at least 1 number',
  })
  @Matches(/(?=.*?[#?!@$%^_&*-])/, {
    message: 'password must have at least 1 special character',
  })
  @Matches(/^\S*$/, {
    message: 'password must have no spaces',
  })
  password: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  bio: string;

  @IsOptional()
  role: UserRoles;

  @IsOptional()
  @IsFile()
  @IsImage()
  @IsFileSize(1042 * 1024)
  avatar: Express.Multer.File;
}
