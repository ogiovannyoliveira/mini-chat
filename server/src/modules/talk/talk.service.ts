import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from '../../shared/entities';
import { Repository } from 'typeorm';
import { CreateTalkDto } from '../../shared/dtos';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private repo: Repository<Talk>
  ) {}

  async create(talk: CreateTalkDto): Promise<Talk> {
    return await this.repo.save(this.repo.create(talk))
  }

  async indexByUsers(talk: CreateTalkDto): Promise<Talk> {
    return await this.repo.findOne({
      where: [
        { user_primary_id: talk.user_primary_id, user_secondary_id: talk.user_secondary_id },
        { user_primary_id: talk.user_secondary_id, user_secondary_id: talk.user_primary_id },
      ]
    })
  }
}
