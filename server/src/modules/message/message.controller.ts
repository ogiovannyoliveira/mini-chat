import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../shared/decorators';
import { CreateMessageDto } from '../../shared/dtos';
import { Message, User } from '../../shared/entities';
import { DefaultAuthGuard } from '../../shared/guards';
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
