import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsSameIdOrAdminGuard } from 'src/common/guards';
import { AvatarInterceptor } from 'src/common/interceptors';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOneById(@Param('userId') userId: string) {
    return this.usersService.findOneById(userId);
  }

  @UseGuards(IsSameIdOrAdminGuard)
  @UseInterceptors(AvatarInterceptor)
  @Put(':userId')
  updateOneById(
    @Param('userId') userId: string,
    @Body() { avatar, ...rest }: UpdateUserDto,
    @UploadedFile() { filename }: Express.Multer.File,
  ) {
    const newBody = {
      ...rest,
      avatar: filename ? `${process.env.ROOT_URL}files/${filename}` : null,
    };
    return this.usersService.updateOneById(userId, newBody);
  }

  @UseGuards(IsSameIdOrAdminGuard)
  @Delete(':userId')
  @HttpCode(204)
  removeOneById(@Param('userId') userId: string) {
    return this.usersService.removeOneById(userId);
  }
}
