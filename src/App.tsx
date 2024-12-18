import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoDetails } from './components/TodoDetails';
import { Todo, TodoStatus } from './types/todo';
import { ListFilter } from 'lucide-react';
import { todoApi } from './services/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus | 'all'>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoApi.getAllTodos();
      const todosArray = Array.isArray(response) ? response : [];
      setTodos(todosArray);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError('Failed to load todos. Please try again later.');
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string, details: string, status: TodoStatus) => {
    try {
      const newTodo = await todoApi.createTodo({
        title,
        details,
        status,
        createdAt: new Date().toISOString(),
      });
      setTodos(prevTodos => Array.isArray(prevTodos) ? [newTodo, ...prevTodos] : [newTodo]);
      setError(null);
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prevTodos => 
        Array.isArray(prevTodos) ? prevTodos.filter((todo) => todo.id !== id) : []
      );
      setError(null);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const updateTodoStatus = async (id: string, status: TodoStatus) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { status });
      setTodos(prevTodos =>
        Array.isArray(prevTodos) 
          ? prevTodos.map((todo) => todo.id === id ? updatedTodo : todo)
          : []
      );
      setError(null);
    } catch (error) {
      console.error('Failed to update todo status:', error);
      setError('Failed to update todo status. Please try again.');
    }
  };

  const filteredTodos = Array.isArray(todos) 
    ? todos.filter((todo) => {
        if (filter === 'all') return true;
        return todo.status === filter;
      })
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo Manager</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
              <ListFilter className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as TodoStatus | 'all')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Tasks</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <TodoList
              todos={filteredTodos}
              onViewDetails={setSelectedTodo}
              onDeleteTodo={deleteTodo}
              onUpdateStatus={updateTodoStatus}
            />
          </div>

          <div>
            <TodoForm onSubmit={addTodo} />
          </div>
        </div>

        <TodoDetails todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      </div>
    </div>
  );
}

export default App;