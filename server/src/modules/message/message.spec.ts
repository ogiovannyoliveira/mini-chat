import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from '../../shared/entities';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageModule', () => {
  let service: MessageService
  let controller: MessageController

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockRepository
        }
      ],
      exports: [MessageService],
    }).compile()

    service = moduleRef.get<MessageService>(MessageService)
    controller = moduleRef.get<MessageController>(MessageController)
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(controller).toBeDefined()
  })
})