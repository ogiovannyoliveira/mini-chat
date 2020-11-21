import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../shared/entities';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message])
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})

export class MessageModule {}
