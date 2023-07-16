import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './infrastructure/swagger/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger(app);
  app.enableCors();
  app.use(cookieParser());

  await app.listen(5000);
}

bootstrap();
