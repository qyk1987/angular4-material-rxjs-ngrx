import {TaskVM} from './task.vm';

export interface TaskListVM {
  id?: string;
  name: string;
  projectId: string;
  order: number;
  tasks: TaskVM[];
}
