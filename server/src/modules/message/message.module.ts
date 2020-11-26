import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../shared/entities';
import { TalkModule } from '../talk/talk.module';
import { TalkService } from '../talk/talk.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => TalkModule),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})

export class MessageModule {}
