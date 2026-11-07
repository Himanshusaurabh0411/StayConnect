import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('StayConnectBootstrap');
  const app = await NestFactory.create(AppModule);

  // Set global API prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // Enable CORS for frontend web client and mobile clients
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://stayconnect.in',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Global pipes, interceptors, and exception filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interactive Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('StayConnect Core API')
    .setDescription(
      "RESTful API endpoints powering India's nationwide accommodation and roommate discovery platform with zero mandatory brokerage.",
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Authentication', 'Phone OTP login, registration, and session verification')
    .addTag('Properties', 'Accommodation search, details, and owner listing management')
    .addTag('Roommates', 'Roommate discovery, compatibility matching, and connections')
    .addTag('Enquiries & Visits', 'Direct owner communication and property visit scheduling')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 StayConnect API Server operational on http://localhost:${port}/api/v1`);
  logger.log(`📖 Swagger API Documentation available on http://localhost:${port}/api/docs`);
}

bootstrap();
