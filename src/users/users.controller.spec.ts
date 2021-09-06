import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findOne: jest.fn((dto) => ({ ...dto })),
    update: jest.fn((dto) => ({ ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find user', async () => {
    const user = await controller.findOne({ user: { userId: 1 } });

    expect(user).toBeTruthy();
  });

  it('should update user', async () => {
    const user = await controller.update(
      '1',
      { email: 'iiglesias@gmail.com' },
      { user: { userId: 1 } },
    );

    expect(user).toBeTruthy();
  });
});
