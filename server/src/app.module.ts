import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import throttlerConfig from './security/throttler.config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthModule,
  ChatModule,
  UserModule,
  MessageModule,
} from './core';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
    DatabaseModule,
    AuthModule,
    UserModule,
    ChatModule,
    MessageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
