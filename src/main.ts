import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000, process.env.HOST ?? '127.0.0.1');
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
