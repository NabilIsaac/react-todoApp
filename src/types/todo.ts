export type TodoStatus = 'not_started' | 'in_progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  details: string;
  status: TodoStatus;
  createdAt: string;
}