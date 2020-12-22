import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, Talk } from '../../shared/entities';
import { getConnection, Repository } from 'typeorm';
import { CreateTalkDto } from '../../shared/dtos';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private repo: Repository<Talk>
  ) {}

  async create(talk: CreateTalkDto): Promise<Talk> {
    return await this.repo.save(this.repo.create(talk))
  }

  async index(id: string): Promise<Talk> {
    return await this.repo.findOne(id)
  }

  async indexByUsers(talk: CreateTalkDto): Promise<Talk> {
    return await this.repo.findOne({
      where: [
        { user_primary_id: talk.user_primary_id, user_secondary_id: talk.user_secondary_id },
        { user_primary_id: talk.user_secondary_id, user_secondary_id: talk.user_primary_id },
      ]
    })
  }

  async hidden(id: string, isPrimary: boolean): Promise<boolean> {
    const toUpdate = isPrimary ? { hidden_to_primary: true } : { hidden_to_secondary: true }

    const updated = await this.repo.createQueryBuilder()
      .update()
      .set(toUpdate)
      .where({ id })
      .execute()

    return !!updated.affected
  }

  async delete(id: string): Promise<boolean> {
    const tms = await getConnection().query(`
      SELECT talk_id FROM talk_messages WHERE talk_id = $1
    `, [ id ])

    const deletedTalkMessages = await this.repo.createQueryBuilder()
      .delete()
      .from('talk_messages')
      .where("talk_id = :id", { id })
      .execute()

    const deletedMessages = await this.repo.createQueryBuilder()
      .delete()
      .from(Message, 'message')
      .where("id = ANY(:id)", { id: tms.map(tm => tm.id) })
      .execute()

    const deletedTalk = await this.repo.createQueryBuilder()
      .delete()
      .from(Talk, 'talk')
      .where("id = :id", { id })
      .execute()

    return !!deletedTalkMessages.affected &&
      !!deletedMessages.affected &&
      !!deletedTalk.affected
  }
}