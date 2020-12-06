import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../shared/decorators';
import { CreateGroupDto } from '../../shared/dtos';
import { Group, User } from '../../shared/entities';
import { DefaultAuthGuard } from '../../shared/guards';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService
  ) {}

  @Post()
  @UseGuards(DefaultAuthGuard)
  async createGroup(
    @Body() group: CreateGroupDto,
    @CurrentUser() { id }: User
  ): Promise<Group> {
    group.creator_id = id
    return await this.groupService.create(group)
  }
}
