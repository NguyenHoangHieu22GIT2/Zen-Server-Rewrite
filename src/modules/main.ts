import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisClient } from 'src/cores/redis/client.redis';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Set Global prefix for each version
  app.setGlobalPrefix('v1');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //Session + Redis
  app.use(
    session({
      store: new RedisStore({ client: RedisClient }),
      saveUninitialized: false,
      secret: 'keyboard monkey',
      resave: false,
      cookie: {
        sameSite: true,
        httpOnly: false,
        maxAge: 600000,
      },
    }),
  );

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

  // Passport Configuration

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
