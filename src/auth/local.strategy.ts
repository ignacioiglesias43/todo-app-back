import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FindUserByField } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(password: string, email?: string, userName?: string) {
    const type: FindUserByField =
      email && email.length > 0 ? 'email' : 'userName';
    const field = email && email.length > 0 ? email : userName;
    const user = await this.authService.validateUser(field, type, password);

    return user;
  }
}
