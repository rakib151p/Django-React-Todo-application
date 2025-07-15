'use client';
// import Cookies from 'js-cookie'; // Add this at the top
import React, { useEffect, useState } from 'react';
import { addTodo } from '../../api/api';
import { useRouter } from 'next/navigation';


export default function AddTodoPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true); // NEW
  useEffect(() => {
    // const access = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    const access = document.cookie.match(/(^| )access=([^;]+)/);
    // const access = localStorage.getItem('access');
    console.log('Access Token:', access);
    if (!access) {
      router.replace('/login');
    } else {
      setLoading(false); // ✅ Allow component to render when token exists
    }
  }, [router]);
  //   useEffect(() => {
  //   const access = localStorage.getItem('access');
  //   console.log('Access Token:', access);
  //   if (!access) {
  //     router.replace('/login');
  //   } else {
  //     setLoading(false); // ✅ Allow rendering after auth check
  //   }
  // }, [router]);
  if (loading) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Adding Todo:', { title, description, status, due_date: dueDate });
      await addTodo({ title, description, status, due_date: dueDate });
      router.push('/todos');
    } catch {
      setError('Failed to add todo');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Todo</h2>
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
            Add Todo
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
