'use client';
import React, { useEffect, useState } from 'react';
import { updateTodo, getTodoById } from '../../../api/api';
import { useRouter, useParams } from 'next/navigation';

export default function EditTodoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // NEW
    
  useEffect(() => {
    const access = document.cookie.match(/(^| )access=([^;]+)/);
    if (!access) {
      router.replace('/login');
      return;
    } else {
      setLoading(false); // ✅ Allow component to render when token exists
    }
    if (id) {
      getTodoById(id).then(todo => {
        setTitle(todo.title);
        setDescription(todo.description);
        setStatus(todo.status);
        setDueDate(todo.due_date);
      });
    }
  }, [id, router]);
  if (loading) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTodo(id, { title, description, status, due_date: dueDate });
        router.push('/todos');
      }
    } catch {
      setError('Failed to update todo');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Todo
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
