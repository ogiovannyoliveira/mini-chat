import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Talk } from '../../shared/entities';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';

describe('TalkModule', () => {
  let service: TalkService
  let controller: TalkController

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TalkController],
      providers: [
        TalkService,
        {
          provide: getRepositoryToken(Talk),
          useValue: mockRepository
        }
      ],
      exports: [TalkService],
    }).compile();

    service = moduleRef.get<TalkService>(TalkService)
    controller = moduleRef.get<TalkController>(TalkController)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(controller).toBeDefined()
  });
});
