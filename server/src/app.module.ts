import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertController } from './modules/alert/alert.controller';
import { ChatGateway } from './modules/chat/chat.gateway';
import { AlertGateway } from './modules/alert/alert.gateway';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { MessageService } from './modules/message/message.service';
import { MessageController } from './modules/message/message.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      port: Number(process.env.DB_PORT || 5432),
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'developer',
      password: process.env.DB_PASS || 'dv1010aa',
      database: process.env.DB_NAME || 'minichat',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: ['error', 'warn']
    }),
    AuthModule,
    UserModule,
    MessageModule,
  ],
  controllers: [
    AlertController,
    MessageController,
  ],
  providers: [
    ChatGateway,
    AlertGateway,
  ],
})

export class AppModule {}
