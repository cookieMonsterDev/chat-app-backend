import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Put,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsSameIdOrAdminGuard } from 'src/common/guards';

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
  @Put(':userId')
  updateOneById(@Param('userId') userId: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateOneById(userId, body);
  }

  @UseGuards(IsSameIdOrAdminGuard)
  @Delete(':userId')
  @HttpCode(204)
  removeOneById(@Param('userId') userId: string) {
    return this.usersService.removeOneById(userId);
  }
}
