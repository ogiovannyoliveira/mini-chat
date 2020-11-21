import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import TestUtil from "../../shared/functions/test/testUtils";
import { User } from "../../shared/entities";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { BadRequestException } from "@nestjs/common";

describe('UserModule', () => {
  let service: UserService
  let controller: UserController

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn()
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
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
    controller = moduleRef.get<UserController>(UserController);
  })

  afterEach(() => {
    jest.resetAllMocks();
 });

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(controller).toBeDefined()
  })

  describe('createUsers', () => {
    it('should be register and return a user', async () => {
      const testUser = TestUtil.giveMeAValidUser()
      mockRepository.save.mockReturnValue(testUser)
      mockRepository.create.mockReturnValue(testUser)

      const createdUser = await service.create(testUser)

      expect(createdUser).toMatchObject(testUser)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
      expect(mockRepository.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('findUsers', () => {
    it('should be show one user by ID', async () => {
      const testUser = TestUtil.giveMeAValidUser()
      mockRepository.findOne.mockReturnValue(testUser)

      const user = await service.index('00000000-0000-0000-0000-000000000000')

      expect(user).toMatchObject({
        id: testUser.id,
        nickname: testUser.nickname
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should be show one user by nickname or ID', async () => {
      const testUser = TestUtil.giveMeAValidUser()
      mockRepository.findOne.mockReturnValue(testUser)

      const userByNickname = await service.indexByNicknameOrID('giovanny')
      const userByID = await service.indexByNicknameOrID('00000000-0000-0000-0000-000000000000')

      expect(userByNickname).toMatchObject({
        id: testUser.id,
        nickname: testUser.nickname
      })

      expect(userByID).toMatchObject({
        id: testUser.id,
        nickname: testUser.nickname
      })

      expect(mockRepository.findOne).toHaveBeenCalledTimes(2)
    })
  })

  describe('UserController', () => {
    it('[controller] should be show one user by nickname or ID', async () => {
      const testUser = TestUtil.giveMeAValidUser()
      mockRepository.findOne.mockReturnValue(testUser)

      const params = {
        nicknameOrID: 'giovanny'
      }

      const caseNicknameOrID = { where: `
      CASE
        WHEN (id::text = 'giovanny') THEN TRUE
        WHEN (nickname = 'giovanny') THEN TRUE
        ELSE id = '00000000-0000-0000-0000-000000000000'
      END
    `}

      controller.indexUser(params)

      expect(mockRepository.findOne).toHaveBeenCalledWith(caseNicknameOrID)
      expect(controller.indexUser(params)).resolves.toMatchObject({
        id: testUser.id,
        nickname: testUser.nickname
      })
    })
  })

  describe('Exception users', () => {
    it('[controller] should not be show one user by nickname or ID', async () => {
      mockRepository.findOne.mockReturnValue(null)

      const params = {
        nicknameOrID: 'cabinha'
      }

      expect(
        controller.indexUser(params)
      ).rejects.toBeInstanceOf(BadRequestException)
    })
  })
})