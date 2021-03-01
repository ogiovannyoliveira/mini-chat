import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../shared/entities';
import { GroupModule } from '../group/group.module';
import { TalkModule } from '../talk/talk.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => TalkModule),
    forwardRef(() => GroupModule),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})

export class MessageModule {}
