import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators';
import { CreateMessageDto } from 'src/shared/dtos';
import { Message, User } from 'src/shared/entities';
import { DefaultAuthGuard } from 'src/shared/guards';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private messageService: MessageService
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
}
