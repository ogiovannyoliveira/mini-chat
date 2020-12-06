import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from 'src/shared/dtos';
import { Group } from '../../shared/entities';
import { Repository } from 'typeorm';
import { use } from 'passport';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private repo: Repository<Group>
  ) {}

  async create(group: CreateGroupDto): Promise<Group> {
    group.photo = group.photo ?? 'default.jpg'
    return await this.repo.save(this.repo.create(group))
  }

  async leave(id: string, user_id: string): Promise<boolean> {
    let group = await this.index(id)

    if (!group) {
      return false
    }

    const memberIndex = group.member_ids.findIndex(m => m === user_id)

    if (memberIndex === -1) {
      return false
    }

    group.member_ids.splice(memberIndex, 1)

    if (group.member_ids.length < 1) {
      const messageIdsGroup = await this.repo.query(`
        SELECT message_id FROM group_messages WHERE group_id = $1
      `, [ id ])

      await this.repo.createQueryBuilder()
        .delete()
        .from('group_messages')
        .where('group_id = :id', { id })
        .execute()

      await this.repo.createQueryBuilder()
        .delete()
        .from('message')
        .where('id = ANY(:id)', { id: messageIdsGroup })
        .execute()

      const deletedGroup = await this.repo.delete({ id })

      return !!deletedGroup.affected
    }

    const updated = await this.repo.update({ id }, group)

    return !!updated.affected
  }

  async index(id: string): Promise<Group> {
    return await this.repo.findOne(id)
  }
}