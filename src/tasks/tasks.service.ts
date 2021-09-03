import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data: {
        ...data,
      },
      select: {
        id: true,
        title: true,
        content: true,
        startDate: true,
        dueDate: true,
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        ownerId: false,
        statusId: false,
        owner: false,
      },
    });
  }

  findAll(ownerId: number) {
    return this.prisma.user.findUnique({ where: { id: ownerId } }).Task({
      select: {
        id: true,
        title: true,
        content: true,
        startDate: true,
        dueDate: true,
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        ownerId: false,
        statusId: false,
        owner: false,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        startDate: true,
        dueDate: true,
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        statusId: false,
        owner: false,
      },
    });
  }

  update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }) {
    const { data, where } = params;

    return this.prisma.task.update({
      data,
      where,
      select: {
        id: true,
        title: true,
        content: true,
        startDate: true,
        dueDate: true,
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        ownerId: false,
        statusId: false,
        owner: false,
      },
    });
  }

  remove(where: Prisma.TaskWhereUniqueInput) {
    return this.prisma.task.delete({
      where,
    });
  }
}
