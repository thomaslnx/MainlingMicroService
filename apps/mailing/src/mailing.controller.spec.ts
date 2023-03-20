import { Test, TestingModule } from '@nestjs/testing';
import { MailServiceController } from './mailing.controller';
import { MailServiceService } from './mailing.service';

describe('MailServiceController', () => {
  let mailServiceController: MailServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailServiceController],
      providers: [MailServiceService],
    }).compile();

    mailServiceController = app.get<MailServiceController>(MailServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailServiceController.getHello()).toBe('Hello World!');
    });
  });
});
