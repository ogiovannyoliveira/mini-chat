import { BadRequestException, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DefaultAuthGuard } from '../../shared/guards';
import { User } from 'src/shared/entities';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get(':nicknameOrID')
  @UseGuards(DefaultAuthGuard)
  async indexUser(@Param() { nicknameOrID }: any) {
    const user = await this.userService.indexByNicknameOrID(nicknameOrID)

    if (!user) {
      throw new BadRequestException('User not found!')
    }

    return user
  }
}