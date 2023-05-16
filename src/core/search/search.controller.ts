import { Controller, Get, Param } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get(':query')
  async search(@Param('query') query: string): Promise<any> {
    const results = {};
    return results;
  }
}
