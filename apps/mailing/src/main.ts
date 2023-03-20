import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MailServiceModule } from './mailing.module';

async function bootstrap() {
  const app = await NestFactory.create(MailServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('MAILING'))
  await app.startAllMicroservices();
}
bootstrap();
