import React from 'react';
import { Todo, TodoStatus } from '../types/todo';
import { Eye, Trash2, CheckCircle, Clock, PlayCircle } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onViewDetails: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateStatus: (id: string, status: TodoStatus) => void;
}

export function TodoList({ todos, onViewDetails, onDeleteTodo, onUpdateStatus }: TodoListProps) {
  const getNextStatus = (currentStatus: TodoStatus): TodoStatus => {
    const statusFlow: { [key in TodoStatus]: TodoStatus } = {
      not_started: 'in_progress',
      in_progress: 'completed',
      completed: 'not_started'
    };
    return statusFlow[currentStatus] || 'not_started';
  };

  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case 'not_started':
        return <Clock size={20} />;
      case 'in_progress':
        return <PlayCircle size={20} />;
      case 'completed':
        return <CheckCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case 'not_started':
        return 'text-gray-400';
      case 'in_progress':
        return 'text-yellow-500';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const formatStatus = (status: TodoStatus | undefined) => {
    if (!status) return 'Not Started';
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onUpdateStatus(todo.id, getNextStatus(todo.status || 'not_started'))}
              className={`p-1 rounded-full ${getStatusColor(todo.status || 'not_started')}`}
            >
              {getStatusIcon(todo.status || 'not_started')}
            </button>
            <div>
              <h3
                className={`text-lg font-medium ${
                  (todo.status || 'not_started') === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </p>
                <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(todo.status || 'not_started')} bg-opacity-10`}>
                  {formatStatus(todo.status)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails(todo)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No todos found. Create a new one to get started!
        </div>
      )}
    </div>
  );
}