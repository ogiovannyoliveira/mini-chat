import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/shared/dtos';
import { isUuid } from 'src/shared/functions';

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

  async indexByNicknameOrID(nicknameOrID: string): Promise<User> {
    let nickname = nicknameOrID
    let uuid = nicknameOrID

    if (!isUuid(nicknameOrID)) uuid = '00000000-0000-0000-0000-000000000000'

    const caseNicknameOrID = `
      CASE
        WHEN (id = '${uuid}') THEN TRUE
        WHEN (nickname = '${nickname}') THEN TRUE
        ELSE id = '00000000-0000-0000-0000-000000000000'
      END
    `

    return await this.repo.findOne({ where: caseNicknameOrID})
  }
}