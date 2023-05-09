import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  UseGuards,
  HttpCode,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards';
import { IsSameIdOrAdminForFileGuard } from 'src/common/guards';
import { unlink } from 'fs';

@Controller('files')
export class FilesController {
  @Get(':id')
  findOneById(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(id, { root: './uploads' });
  }

  @UseGuards(JwtGuard, IsSameIdOrAdminForFileGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteOneById(@Param('id') id: string) {
    unlink(`./uploads/${id}`, (err) => {
      if (err) throw new InternalServerErrorException('Something went wrong');
    });
    return;
  }
}
