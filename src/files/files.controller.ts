import { Controller, Get, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards';

@Controller('files')
export class FilesController {
  @Get(':id')
  findOneById(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(id, { root: './uploads/avatars' });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteOneById() {
    return '';
  }
}
