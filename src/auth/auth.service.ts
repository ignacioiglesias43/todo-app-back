import { Injectable } from '@nestjs/common';
import { UsersService, FindUserByField } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../utils/comparePassword';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: AuthUserDto) {
    const payload = { username: user.userName || user.email, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
