import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { BoardModule } from './app/board/board.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('RetroBoard')
    .setDescription('RetroBoard API endpoints description')
    .setVersion('1.0')
    .addTag('board')
    .addBearerAuth()
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const options: SwaggerDocumentOptions = {
    include: [BoardModule],
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'RetroBoard API Swagger Docs',
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('doc', app, document, swaggerCustomOptions);

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
