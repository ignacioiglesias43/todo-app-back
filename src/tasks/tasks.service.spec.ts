import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockPrismaService = {
    task: {
      create: jest.fn((dto) => ({ ...dto })),
      findUnique: jest.fn((dto) => ({ ...dto })),
      update: jest.fn((dto) => ({ ...dto })),
      delete: jest.fn((dto) => ({ ...dto })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const task = await service.create({
      title: 'Prueba',
      content: 'test',
      owner: {
        connect: {
          id: 1,
        },
      },
      status: {
        connect: {
          id: 2,
        },
      },
    });

    expect(task).toBeTruthy();
  });

  it('should update a task', async () => {
    const task = await service.update({
      data: {
        title: 'Prueba',
        content: 'test',
        status: {
          connect: {
            id: 1,
          },
        },
      },
      where: {
        id: 1,
      },
    });

    expect(task).toBeTruthy();
  });

  it('should delete a task', async () => {
    const task = await service.remove({ id: 1 });

    expect(task).toBeTruthy();
  });
});
