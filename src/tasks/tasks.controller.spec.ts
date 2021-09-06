import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn((dto) => ({ ...dto })),
    findAll: jest.fn((dto) => ({ ...dto })),
    findOne: jest.fn((dto) => ({ ...dto, ownerId: 1 })),
    update: jest.fn((dto) => ({ ...dto })),
    remove: jest.fn((dto) => ({ ...dto })),
  };
  const mockPrismaService = {
    create: jest.fn((dto) => ({ ...dto })),
    findUnique: jest.fn((dto) => ({ ...dto })),
    update: jest.fn((dto) => ({ ...dto })),
    delete: jest.fn((dto) => ({ ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, PrismaService],
    })
      .overrideProvider(TasksService)
      .useValue(mockTasksService)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const task = await controller.create(
      { title: 'Prueba', content: 'test' },
      {
        user: {
          userId: 1,
        },
      },
    );

    expect(task).toBeTruthy();
  });

  it('should update a task', async () => {
    const task = await controller.update(
      '1',
      { title: 'Prueba', content: 'test' },
      {
        user: {
          userId: 1,
        },
      },
    );

    expect(task).toBeTruthy();
  });

  it('should delete a task', async () => {
    const task = await controller.remove('1', {
      user: {
        userId: 1,
      },
    });

    expect(task).toBeTruthy();
  });
});
