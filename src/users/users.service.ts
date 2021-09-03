import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from '../utils/hashPassword';

export type FindUserByField = 'email' | 'userName';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...user } = createUserDto;
    const hashedPassword = await hashPassword(user.password);
    return this.prisma.user.create({
      data: { ...user, password: hashedPassword },
      select: {
        id: true,
        name: true,
        lastName: true,
        userName: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        lastName: true,
        userName: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOneByEmailOrUserName(fieldType: FindUserByField, field: string) {
    return this.prisma.user.findUnique({
      where: {
        [fieldType]: field,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
