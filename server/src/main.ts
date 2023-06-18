import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import corsConfig from './security/cors.confing';
import { TypeORMExceptionFilter } from './database/typeorm.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new TypeORMExceptionFilter());

  app.enableCors(corsConfig);

  await app.listen(3000);
}
bootstrap();
