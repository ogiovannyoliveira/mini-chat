import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/shared/dtos';
import { Message } from 'src/shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>
  ) {}

  async create(message: CreateMessageDto): Promise<Message> {
    return await this.repo.save(this.repo.create(message))
  }
}
