import { User } from '../domain';
import { TaskListVM } from './task-list.vm';

export interface ProjectVM {
  id: string | null;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskLists?: TaskListVM[];
  members?: User[];
}
