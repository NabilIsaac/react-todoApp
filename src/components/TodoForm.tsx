import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { TodoStatus } from '../types/todo';

interface TodoFormProps {
  onSubmit: (title: string, details: string, status: TodoStatus) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<TodoStatus>('not_started');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && details.trim()) {
      onSubmit(title, details, status);
      setTitle('');
      setDetails('');
      setStatus('not_started');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter todo title"
        />
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">
          Details
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter todo details"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TodoStatus)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Todo
      </button>
    </form>
  );
}