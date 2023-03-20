import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterController } from './user-register.controller';
import { UserRegisterService } from './user-register.service';

describe('UserRegisterController', () => {
  let userRegisterController: UserRegisterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserRegisterController],
      providers: [UserRegisterService],
    }).compile();

    userRegisterController = app.get<UserRegisterController>(UserRegisterController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(userRegisterController.getHello()).toBe('Hello World!');
  //   });
  // });
});
