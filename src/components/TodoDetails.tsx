import React from 'react';
import { Todo } from '../types/todo';
import { X } from 'lucide-react';

interface TodoDetailsProps {
  todo: Todo | null;
  onClose: () => void;
}

export function TodoDetails({ todo, onClose }: TodoDetailsProps) {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Todo Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Title</h3>
            <p className="mt-1 text-lg">{todo.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Details</h3>
            <p className="mt-1">{todo.details}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                todo.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {todo.status}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Created At</h3>
            <p className="mt-1">{new Date(todo.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}