import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsOptional()
  startDate?: string = null;
  @IsOptional()
  dueDate?: string = null;
  @IsOptional()
  statusId?: number = 2;
}
