import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from 'src/shared/dtos';
import { Group } from '../../shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private repo: Repository<Group>
  ) {}

  async create(group: CreateGroupDto): Promise<Group> {
    group.photo = group.photo ?? 'default.jpg'
    return await this.repo.save(this.repo.create(group))
  }
}