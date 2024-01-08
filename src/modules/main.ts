import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisClient } from 'src/cores/redis/client.redis';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Swagger Configuration : START
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Social Media Zen')
    .setDescription('API for Social Media Zen')
    .setVersion('1.0')
    .addTag('zen')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
  // Swagger Configuration : END
  // Connect Redis
  RedisClient.connect();
  await app.listen(3001);
}
bootstrap();