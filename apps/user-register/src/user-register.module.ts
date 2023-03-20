import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRegisterController } from './user-register.controller';
import { DatabaseModule, RmqModule } from '@app/common';
import { UserRegisterService } from './user-register.service';
import { UsersRegisterRepository } from './user-register.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user-register.schema';
import { HttpModule } from '@nestjs/axios';
import { MAILING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/user-register/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
    RmqModule.register({
      name: MAILING_SERVICE
    })
  ],
  controllers: [UserRegisterController],
  providers: [UserRegisterService, UsersRegisterRepository],
})
export class UserRegisterModule {}
