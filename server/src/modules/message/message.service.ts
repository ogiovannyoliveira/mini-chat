import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto, CreateMessageToGroupDto, CreateMessageToTalkDto } from '../../shared/dtos';
import { Message } from '../../shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>
  ) {}

  async create(message: CreateMessageDto): Promise<Message> {
    return await this.repo.save(this.repo.create(message))
  }

  async createMessageToTalk(tm: CreateMessageToTalkDto): Promise<any> {
    const tmCreated = await this.repo.createQueryBuilder()
      .insert()
      .into('talk_messages')
      .values(tm)
      .returning('*')
      .execute()


    return tmCreated.raw
  }

  async createMessageToGroup(gm: CreateMessageToGroupDto): Promise<any> {
    const gmCreated = await this.repo.createQueryBuilder()
      .insert()
      .into('group_messages')
      .values(gm)
      .returning('*')
      .execute()

    return gmCreated.raw
  }
}
