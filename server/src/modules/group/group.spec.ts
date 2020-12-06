import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from '../../shared/entities';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
  let controller: GroupController;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(Group),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = moduleRef.get<GroupService>(GroupService);
    controller = moduleRef.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});
