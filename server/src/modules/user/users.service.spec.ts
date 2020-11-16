import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import TestUtil from "../../shared/functions/test/testUtils";
import { User } from "../../shared/entities";
import { UserService } from "./user.service";

describe('UserService', () => {
  let service: UserService

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
      exports: [UserService],
    }).compile()

    service = moduleRef.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findUsers', () => {
    it('should be show one user by ID', async () => {
      const testUser = TestUtil.giveMeAValidUser()
      mockRepository.findOne.mockReturnValue(testUser)

      const user = await service.index('00000000-0000-0000-0000-000000000000')

      expect(user).toMatchObject({
        id: '00000000-0000-0000-0000-000000000000',
        nickname: "giovanny",
      })
    })

    it('should be show one user by nickname or ID', async () => {
      const testUser = TestUtil.giveMeAValidUser()
      mockRepository.findOne.mockReturnValue(testUser)

      const user = await service.indexByNicknameOrID('giovanny')

      expect(user).toMatchObject({
        id: '00000000-0000-0000-0000-000000000000',
        nickname: "giovanny",
      })
    })
  })
})