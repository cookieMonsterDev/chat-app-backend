import {
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserQueriesDto } from './dto/user-queries.dto';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards';
import { UserOrAdminGuard } from 'src/common/guards';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findAll(@Query() queries: UserQueriesDto) {
    return this.userService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @UseGuards(UserOrAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }
}
