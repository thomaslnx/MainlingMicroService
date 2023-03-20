import { RmqService } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailServiceService } from './mailing.service';

@Controller()
export class MailServiceController {
  constructor(
    private readonly mailService: MailServiceService,
    private readonly rmqService: RmqService
  ) {}

  @Get()
  getHello(): string {
    return this.mailService.getHello();
  }

  @EventPattern('user-created')
  async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.mailService.sendMail(data);
    this.rmqService.ack(context);
  }
}
