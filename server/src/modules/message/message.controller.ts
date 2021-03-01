import { BadRequestException, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../shared/decorators';
import { CreateMessageDto, CreateMessageToGroupDto } from '../../shared/dtos';
import { Message, User } from '../../shared/entities';
import { DefaultAuthGuard } from '../../shared/guards';
import { GroupService } from '../group/group.service';
import { TalkService } from '../talk/talk.service';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private talkService: TalkService,
    private groupService: GroupService,
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

  @Post('group/:id')
  @UseGuards(DefaultAuthGuard)
  async createMessageToGroup(
    @Param('id') id: string,
    @Body() message: CreateMessageDto,
    @CurrentUser() { id: user_id }: User
  ): Promise<Message> {
    message.sender_id = user_id

    const groupExists = await this.groupService.index(id)

    if (!groupExists) {
      throw new BadRequestException('Group not exists!')
    }

    const createdMessage = await this.messageService.create(message)

    await this.messageService.createMessageToGroup({
      message_id: createdMessage.id,
      group_id: groupExists.id
    })

    return createdMessage
  }
}
