import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule, UserModule } from './core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import throttlerConfig from './security/throttler.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
