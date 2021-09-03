import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() task: CreateTaskDto, @Req() request) {
    const { userId } = request.user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { statusId, ...newTask } = task;
    return this.tasksService.create({
      ...newTask,
      owner: {
        connect: { id: userId },
      },
      status: {
        connect: {
          // Select always In Process as Default
          id: 2,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request) {
    const { userId } = request.user;
    return this.tasksService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request) {
    const { userId } = request.user;

    const { ownerId, ...task } = await this.tasksService.findOne(+id);

    if (ownerId !== userId) {
      throw new UnauthorizedException(
        'Access denied, you do not have the rights to see this task.',
      );
    }

    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request,
  ) {
    const { userId } = request.user;
    const { ownerId } = await this.tasksService.findOne(+id);
    const { title, content, dueDate, startDate, statusId } = updateTaskDto;

    if (ownerId !== userId) {
      throw new UnauthorizedException(
        'Access denied, you do not have the rights to see this task.',
      );
    }

    return this.tasksService.update({
      where: {
        id: +id,
      },
      data: {
        title,
        content,
        dueDate,
        startDate,
        status: { connect: { id: +statusId } },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request) {
    const { userId } = request.user;
    const task = await this.tasksService.findOne(+id);

    if (!task) {
      throw new NotFoundException('Record not found.');
    }

    if (task.ownerId !== userId) {
      throw new UnauthorizedException(
        'Access denied, you do not have the rights to see this task.',
      );
    }

    return this.tasksService.remove({ id: +id });
  }
}
