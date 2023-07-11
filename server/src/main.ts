import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './infrastructure/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger(app);
  app.enableCors();

  await app.listen(5000);
}

bootstrap();
