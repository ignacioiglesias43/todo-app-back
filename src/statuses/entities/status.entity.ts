import { Status } from '@prisma/client';

export class StatusEntity implements Status {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
