import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatusesService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.status.findMany({
      select: {
        id: true,
        name: true,
        createdAt: false,
        updatedAt: false,
        Task: false,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.status.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: false,
        updatedAt: false,
        Task: false,
      },
    });
  }
}
