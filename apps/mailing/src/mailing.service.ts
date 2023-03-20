import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailServiceService {
  constructor(private mailerService: MailerService) {}
  private readonly logger = new Logger(MailServiceService.name);

  async sendMail(data: any) {
    // this.logger.log('Sending mail...', data);
    await this.mailerService.sendMail({
      to: `${data.user.first_name}@example.com`,
      from: 'marcos@example.com',
      subject: 'Mailer Service Email Testing',
      template: './newUser',
      context: {
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        avatar: data.user.avatar,
      }
    })
  }

  getHello(): string {
    return 'Hello World!';
  }
}
