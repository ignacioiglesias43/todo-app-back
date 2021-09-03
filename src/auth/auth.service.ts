import { Injectable } from '@nestjs/common';
import { UsersService, FindUserByField } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../utils/comparePassword';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

interface resultUserNotExists {
  existsEmail?: boolean;
  existsUserName?: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /* This function validates if either email or username exists on db */
  async validateUserNotExists(
    email: string,
    userName?: string,
  ): Promise<resultUserNotExists> {
    const result: resultUserNotExists = {};

    const existsEmail = await this.usersService.findOneByEmailOrUserName(
      'email',
      email,
    );

    result.existsEmail = !!existsEmail;

    if (userName) {
      const existsUserName = await this.usersService.findOneByEmailOrUserName(
        'userName',
        userName,
      );

      result.existsUserName = !!existsUserName;
    }

    return result;
  }

  /* Validates if user exists either by email or username, and validates that password and recorded password match */
  async validateUser(field: string, fieldType: FindUserByField, pass: string) {
    const user = await this.usersService.findOneByEmailOrUserName(
      fieldType,
      field,
    );

    const arePasswordEquals = await comparePassword(pass, user.password);

    if (user && arePasswordEquals) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);

    return this.login(newUser);
  }

  async login(user: AuthUserDto) {
    const payload = { username: user.userName || user.email, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
