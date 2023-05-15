import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule, UserModule } from './core';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
