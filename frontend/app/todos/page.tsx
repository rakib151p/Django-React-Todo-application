'use client';
import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo } from '../api/api';
import { useRouter } from 'next/navigation';

function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
}

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const access = typeof document !== 'undefined' ? document.cookie.match(/(^| )access=([^;]+)/) : null;
    if (!access) {
      router.replace('/login');
      return;
    }
    fetchTodos();
  }, [router]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch {
      setError('Failed to fetch todos');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleToggleStatus = async (todo: Todo) => {
    const newStatus = todo.status === 'pending' ? 'completed' : 'pending';
    await updateTodo(todo.id, { ...todo, status: newStatus });
    fetchTodos();
  };

  const handleLogout = () => {
    clearCookie('access');
    clearCookie('refresh');
    clearCookie('user');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Todo List</h2>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/todos/add')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Todo
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <ul className="space-y-4">
          {todos.map(todo => (
            <li key={todo.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded border">
              <div>
                <div className="font-semibold text-lg">{todo.title}</div>
                <div className="text-gray-600">{todo.description}</div>
                <div className="text-sm text-gray-500">Status: {todo.status} | Due: {todo.due_date}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleToggleStatus(todo)}
                  className={`px-3 py-1 rounded transition text-white ${todo.status === 'pending' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'}`}
                >
                  {todo.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
                </button>
                <button
                  onClick={() => router.push(`/todos/${todo.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/todos/edit/${todo.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
