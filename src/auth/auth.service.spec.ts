import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findOneByEmailOrUserName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate a user', async () => {
    const user = await service.login({
      id: 1,
      email: 'iiglesiascampoy@gmail.com',
      name: 'Ignacio',
      lastName: 'Iglesias',
    });
    expect(user).toBeInstanceOf(Object);
  });

  it('should register a user', async () => {
    const user = await service.signup({
      name: 'Ignacio',
      lastName: 'Iglesias',
      email: 'iiglesiascampoy@gmail.com',
      password: 'secret',
      repeatPassword: 'secret',
    });

    expect(user).toBeInstanceOf(Object);
  });
});
