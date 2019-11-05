import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const PORT = config.get('PORT');
  
  app.enableCors();
  await app.listen(PORT || 3002);
}
bootstrap();
