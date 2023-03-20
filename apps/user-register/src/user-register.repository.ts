import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user-register.schema';

@Injectable()
export class UsersRegisterRepository<User> {
  protected readonly logger = new Logger(UsersRegisterRepository.name);

  constructor(
    @InjectModel(User.name) userRegisterModel: Model<User>,
  ) {}
}