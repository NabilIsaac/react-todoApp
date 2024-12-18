import axios from 'axios';
import { Todo, TodoStatus } from '../types/todo';

const API_URL = 'http://oversight.pokkada.com/api/todos';

const normalizeStatus = (status: any): TodoStatus => {
  if (status === 'not_started' || status === 'in_progress' || status === 'completed') {
    return status;
  }
  return 'not_started';
};

interface ApiResponse {
  data: Array<{
    id: number;
    title: string;
    details: string;
    status: string;
    created_at: string;
    updated_at: string;
  }>;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    total: number;
    per_page: number;
  };
}

const normalizeTodo = (data: any): Todo => {
  return {
    id: data.id?.toString() || Date.now().toString(),
    title: data.title || '',
    details: data.details || '',
    status: normalizeStatus(data.status),
    createdAt: data.created_at || data.createdAt || new Date().toISOString(),
  };
};

export const todoApi = {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get<ApiResponse>(API_URL);
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map(normalizeTodo);
      }
      return [];
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    try {
      const response = await axios.post(API_URL, {
        ...todo,
        created_at: todo.createdAt,
      });
      return normalizeTodo(response.data.data);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        ...todo,
        created_at: todo.createdAt,
      });
      return normalizeTodo(response.data.data);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async deleteTodo(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
