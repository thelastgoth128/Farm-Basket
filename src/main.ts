import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Farm-Basket')
  .setDescription('Farm-Basket controller documentation')
  .setVersion('1.0.0')
  .build();

const document = SwaggerModule.createDocument( app, config)

SwaggerModule.setup('api', app, document)
  app.enableCors()
  app.use(cookieParser())
  await app.listen(process.env.APP_PORT);
}
bootstrap();
