import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { constants } from './constants';
import { User } from 'src/shared/entities';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload

    const user = await this.userService.index(id)
    if (!user) {
      throw new UnauthorizedException('User not exists!')
    }

    return user
  }
}