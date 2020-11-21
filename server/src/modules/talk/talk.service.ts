import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from '../../shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private repo: Repository<Talk>
  ) {}
}
