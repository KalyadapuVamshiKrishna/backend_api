import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule); 
  const configService = app.get(ConfigService);

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that are not in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra properties are sent
      transform: true, // Automatically transforms payloads (e.g., string numbers to integers)
    }),
  );

  // 4. Enable CORS
  // Crucial if your frontend will run on a different port (e.g., React on 3000, Nest on 3001)
  app.enableCors();

  // 5. Define the Port
  // Try to get 'PORT' from .env, otherwise default to 3000
  const port = configService.get<number>('PORT') || 3000;

  // 6. Start the Server
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();