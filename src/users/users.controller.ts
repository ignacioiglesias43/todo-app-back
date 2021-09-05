import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('own-info')
  findOne(@Req() request) {
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('Access denied.');
    }
    return this.usersService.findOne(+user?.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto, @Req() request) {
    if (request.user.userId !== id) {
      throw new UnauthorizedException(
        "Access denied, you're not the same user as you requested to update.",
      );
    }
    return this.usersService.update(+id, body);
  }
}
