import { Task } from '@prisma/client';

export class TaskEntity implements Task {
  id: number;
  title: string;
  content: string;
  startDate: Date;
  dueDate: Date;
  statusId: number;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}
