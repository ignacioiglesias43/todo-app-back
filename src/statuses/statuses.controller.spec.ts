import { Status } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

describe('StatusesController', () => {
  let controller: StatusesController;

  const mockStatusesService = {
    findAll: jest.fn(() => {
      const statuses: Status[] = [];
      return statuses;
    }),
    findOne: jest.fn(() => {
      const status: Status = {
        id: 1,
        name: 'In Process',
        createdAt: null,
        updatedAt: null,
      };
      return status;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusesController],
      providers: [StatusesService],
    })
      .overrideProvider(StatusesService)
      .useValue(mockStatusesService)
      .compile();

    controller = module.get<StatusesController>(StatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all statuses', async () => {
    const statuses = await controller.findAll();

    expect(statuses).toBeTruthy();
  });

  it('should return a single status', async () => {
    const status = await controller.findOne('1');

    expect(status).toBeTruthy();
  });
});
