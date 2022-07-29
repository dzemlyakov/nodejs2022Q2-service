import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { cwd } from 'process';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT');
  const DOC_API = await readFile(resolve(cwd(), 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => {
    console.log(`app running on port: ${PORT}`);
  });
}

bootstrap();
