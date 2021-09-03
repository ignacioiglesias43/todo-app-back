export interface Task {
  id: number;
  title: string;
  content: string;
  startDate?: string;
  dueDate?: string;
  statusId: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}
