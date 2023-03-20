import { NestFactory } from '@nestjs/core';
import { UserRegisterModule } from './user-register.module';

async function bootstrap() {
  const app = await NestFactory.create(UserRegisterModule);
  await app.listen(3000);
}
bootstrap();
