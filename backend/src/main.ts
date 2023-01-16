import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enabling Cors
  const configService = app.get(ConfigService);
  const webBaseUrl =
    configService.get('NODE_ENV') === 'production'
      ? ''
      : 'http://localhost:3000';
  app.enableCors({ origin: webBaseUrl, credentials: true });

  app.use(cookieParser(configService.get('COOKIE_SECRET')));

  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
