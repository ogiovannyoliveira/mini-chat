import {
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto } from 'src/shared/dtos';
import { User } from 'src/shared/entities';
import { Token } from 'src/shared/@types';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<Token> {
    const nicknameExists = await this.userService.indexByNicknameOrID(user.nickname)

    if (nicknameExists) {
      throw new ConflictException('Nickname already exists! Please, choose another...')
    }

    const createdUser = await this.userService.create(user)

    if (!createdUser) {
      throw new InternalServerErrorException("User could not be created!")
    }

    return await this.generateToken(createdUser)
  }

  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<Token> {
    const userByNickname = await this.userService.indexByNicknameOrID(user.nickname)

    if (!userByNickname) {
      throw new BadRequestException('User not exists!')
    }

    const passwordIsCorrect = await userByNickname.comparePassword(user.password)

    if (!passwordIsCorrect) {
      throw new BadRequestException('Wrong password!')
    }

    return await this.generateToken(userByNickname)
  }

  private async generateToken(user: User): Promise<Token> {
    const token = await this.jwtService.signAsync({
      id: user.id
    })

    return { token }
  }
}