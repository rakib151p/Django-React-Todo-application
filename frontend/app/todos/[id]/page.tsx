'use client';
import React, { useEffect, useState } from 'react';
import { getTodoById } from '../../api/api';
import { useRouter, useParams } from 'next/navigation';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  created_at?: string;
  updated_at?: string;
}

export default function TodoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getTodoById(id)
        .then(setTodo)
        .catch(() => setError('Failed to fetch todo'));
    }
  }, [id]);

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>;
  }
  if (!todo) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Todo Detail</h2>
        <div className="mb-4">
          <div className="font-semibold text-lg">{todo.title}</div>
          <div className="text-gray-600">{todo.description}</div>
          <div className="text-sm text-gray-500">Status: {todo.status}</div>
          <div className="text-sm text-gray-500">Due: {todo.due_date}</div>
          {todo.created_at && <div className="text-xs text-gray-400">Created: {todo.created_at}</div>}
          {todo.updated_at && <div className="text-xs text-gray-400">Updated: {todo.updated_at}</div>}
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
