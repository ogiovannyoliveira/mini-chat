import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService
  let controller: MessageController

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile()

    service = moduleRef.get<MessageService>(MessageService)
    controller = moduleRef.get<MessageController>(MessageController)
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(controller).toBeDefined()
  });
});
