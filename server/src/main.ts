import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './config/swagger/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger(app);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(5000);
}

bootstrap();
