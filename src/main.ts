import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3001);
}
bootstrap();
