import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/shared/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.repo.save(this.repo.create(user))
  }

  async index(id: string): Promise<User> {
    return await this.repo.findOne(id)
  }

  async indexByNickname(nickname: string): Promise<User> {
    return await this.repo.findOne({ where: { nickname } })
  }
}