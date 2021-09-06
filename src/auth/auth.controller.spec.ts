import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    login: jest.fn((dto) => ({ ...dto })),
    signup: jest.fn((dto) => ({ ...dto })),
    validateUser: jest.fn((dto) => ({ ...dto })),
    validateUserNotExists: jest.fn((dto) => ({ ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should authenticate a user', async () => {
    const user = await controller.login({
      email: 'iiglesiascampoy@gmail.com',
      password: 'secret',
    });

    expect(user).toBeTruthy();
  });

  it('should register a user', async () => {
    const user = await controller.signup({
      name: 'Ignacio',
      lastName: 'Iglesias',
      email: 'iiglesias_10@gmail.com',
      password: 'secret',
      repeatPassword: 'secret',
    });

    expect(user).toBeTruthy();
  });
});
