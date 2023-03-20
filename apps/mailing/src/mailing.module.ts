import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { MailServiceController } from './mailing.controller';
import { MailServiceService } from './mailing.service';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MAILING_QUEUE: Joi.string().required(),
      })
    }),
    MailerModule.forRoot({
      transport: {
        host:'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '973c1c42a1ff0e',
          pass: 'cd1a0a1a16b848'
        }
      },
      defaults: {
        from: '"No Reply" <noreply-marcos@example.com>'
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      }
    }),
    RmqModule],
  controllers: [MailServiceController],
  providers: [MailServiceService],
})
export class MailServiceModule {}
