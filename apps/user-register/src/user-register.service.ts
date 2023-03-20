import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map, catchError, lastValueFrom } from 'rxjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user-register.schema';
import { MAILING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserRegisterService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private readonly httpService: HttpService,
    @Inject(MAILING_SERVICE) private mailingClient: ClientProxy
  ) {}
  
  async getAllUsers(): Promise<Observable<AxiosResponse<User[], any>>> {
    const users = await this.httpService.get('https://reqres.in/api/users')
                    .pipe(map((response) => response.data),
                    catchError((error) => {
                      throw new HttpException(
                        error.response.data, error.response.status
                      );
                    }),
                  );
    return users;
  }

  async getOneUser(id: number): Promise<Observable<AxiosResponse<any, any>>> {
    const user = await this.httpService.get(`https://reqres.in/api/users/${id}`)
                    .pipe(map((response) => response.data),
                    catchError((error) => {
                      throw new HttpException(
                        error.response.data, error.response.status
                      )
                    })
                  );
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User | any> {
    try {
      const newUser = await new this.usersModel(user);

      await lastValueFrom(
        this.mailingClient.emit('user-created', {
          user
        })
      );

      return await newUser.save();
    } catch (error) {
      return ({
        error: `Error: ${error}`
      })
    }
  }
}
