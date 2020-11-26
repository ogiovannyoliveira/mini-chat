import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../shared/decorators';
import { CreateMessageDto } from '../../shared/dtos';
import { Message, User } from '../../shared/entities';
import { DefaultAuthGuard } from '../../shared/guards';
import { TalkService } from '../talk/talk.service';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private talkService: TalkService
  ) {}

  @Post()
  @UseGuards(DefaultAuthGuard)
  async createMessage(
    @Body() message: CreateMessageDto,
    @CurrentUser() { id }: User
  ): Promise<Message> {
    message.sender_id = id
    return await this.messageService.create(message)
  }

  @Post('talk')
  @UseGuards(DefaultAuthGuard)
  async createMessageToTalk(
    @Body() message: CreateMessageDto,
    @CurrentUser() { id }: User
  ): Promise<Message> {
    message.sender_id = id

    const createdMessage = await this.messageService.create(message)

    let hasTalkBetween = await this.talkService.indexByUsers({
      user_primary_id: message.sender_id,
      user_secondary_id: message.receiver_id
    })

    if (!hasTalkBetween) {
      hasTalkBetween = await this.talkService.create({
        user_primary_id: message.sender_id,
        user_secondary_id: message.receiver_id
      })
    }

    await this.messageService.createMessageToTalk({
      message_id: createdMessage.id,
      talk_id: hasTalkBetween.id
    })

    return createdMessage
  }
}
