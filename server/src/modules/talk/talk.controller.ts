import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators';
import { CreateTalkDto } from 'src/shared/dtos';
import { User } from 'src/shared/entities';
import { DefaultAuthGuard } from 'src/shared/guards';
import { TalkService } from './talk.service';

@Controller('talk')
export class TalkController {
  constructor(
    private talkService: TalkService
  ) {}

  @Post()
  @UseGuards(DefaultAuthGuard)
  async createTalk(
    @Body() talk: CreateTalkDto,
    @CurrentUser() currentUser: User
  ) {
    talk.user_primary_id = currentUser.id

    const talkByUsers = await this.talkService.indexByUsers(talk)

    if (talkByUsers) {
      throw new BadRequestException('Talk already exists!')
    }

    const createdTalk = await this.talkService.create(talk)

    if (!createdTalk) {
      throw new InternalServerErrorException('Talk not created!')
    }

    return createdTalk
  }

  @Get(':id')
  @UseGuards(DefaultAuthGuard)
  async indexTalk(@Param() { id }: { id: string }) {
    return await this.talkService.index(id)
  }
}
