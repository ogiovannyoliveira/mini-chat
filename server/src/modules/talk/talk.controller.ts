import { Controller } from '@nestjs/common';
import { TalkService } from './talk.service';

@Controller('talk')
export class TalkController {
  constructor(
    private talkService: TalkService
  ) {}
}
