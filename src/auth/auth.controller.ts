import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalStrategy } from './local.strategy';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private localStrategy: LocalStrategy,
  ) {}

  @Post('login')
  async login(@Body() body: AuthCredentialsDto) {
    const { email = '', password = '', userName = '' } = body;
    if ((email.length > 0 || userName.length > 0) && password.length > 0) {
      const user = await this.localStrategy.validate(password, email, userName);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return this.authService.login(user);
    }

    throw new BadRequestException(
      'Password is required and at least E-Mail or username too.',
    );
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      userName = '',
    } = body;
    if (name && lastName && email && password && repeatPassword) {
      const userExists = await this.authService.validateUserNotExists(
        email,
        userName,
      );

      if (userExists.existsEmail) {
        throw new BadRequestException(
          `The following e-mail already exists on records: ${email}`,
        );
      }

      if (userExists.existsUserName) {
        throw new BadRequestException(
          `The following userName already exists on records: ${userName}`,
        );
      }

      if (password !== repeatPassword) {
        throw new BadRequestException("Password's do not match.");
      }

      return this.authService.signup(body);
    }

    throw new UnauthorizedException(
      'The following fields are required: Name, LastName, Email, Password and Repeat Password.',
    );
  }
}
