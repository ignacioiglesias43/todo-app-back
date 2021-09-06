import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      create: jest.fn((dto) => ({ ...dto })),
      findUnique: jest.fn((dto) => ({ ...dto })),
      update: jest.fn((dto) => ({ ...dto })),
      delete: jest.fn((dto) => ({ ...dto })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create({
      email: 'iiglesias@gmail.com',
      lastName: 'Iglesias',
      name: 'Ignacio',
      password: 'secret',
      repeatPassword: 'secret',
      userName: 'iiglesias_10',
    });

    expect(user).toBeTruthy();
  });

  it('should update a user', async () => {
    const user = await service.update(1, {
      email: 'iiglesias@gmail.com',
      lastName: 'Iglesias',
      name: 'Ignacio',
      userName: 'iiglesias_10',
    });

    expect(user).toBeTruthy();
  });

  it('should delete a user', async () => {
    const user = await service.remove(1);

    expect(user).toBeTruthy();
  });
});
