import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DefaultAuthGuard } from 'src/shared/guards';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get(':id')
  @UseGuards(DefaultAuthGuard)
  async indexUser(@Param() { id }: any) {
    return await this.userService.index(id)
  }
}
