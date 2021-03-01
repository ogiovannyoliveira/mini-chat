import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertController } from './modules/alert/alert.controller';
import { ChatGateway } from './modules/chat/chat.gateway';
import { AlertGateway } from './modules/alert/alert.gateway';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { MessageController } from './modules/message/message.controller';
import { TalkModule } from './modules/talk/talk.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      port: Number(process.env.DB_PORT || 5432),
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'giovanny',
      password: process.env.DB_PASS || 'dv1010aa',
      database: process.env.DB_NAME || 'minichat',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: ['error', 'warn']
    }),
    AuthModule,
    UserModule,
    MessageModule,
    TalkModule,
    GroupModule,
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
