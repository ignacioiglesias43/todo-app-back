import { Test, TestingModule } from '@nestjs/testing';
import { StatusesService } from './statuses.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StatusesService', () => {
  let service: StatusesService;

  const mockPrismaService = {
    status: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
