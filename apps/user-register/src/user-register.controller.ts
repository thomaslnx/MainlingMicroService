import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRegisterService } from './user-register.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  @Get()
  async getAllUsers() {
    return this.userRegisterService.getAllUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return await this.userRegisterService.getOneUser(+id);
  }

  // @Get()
  // async getAvatarImageFromUser(@Param('id') id: string) {
  //   return this.userRegisterService.getAvatarUserImage(+id);
  // }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const newUser = await this.userRegisterService.createUser(user)
    return newUser;
  }
}
