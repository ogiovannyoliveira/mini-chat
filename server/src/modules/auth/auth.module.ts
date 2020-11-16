import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: {
        expiresIn: '8h',
        algorithm: 'HS512',
      },
      verifyOptions: {
        algorithms: ['HS512'],
      }
    }),
    UserModule,
  ],
  controllers: [
    AuthController
  ],
  providers: [
    JwtStrategy
  ],
  exports: [],
})

export class AuthModule {}