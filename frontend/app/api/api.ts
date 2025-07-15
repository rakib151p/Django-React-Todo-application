import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export const registerUser = async (username: string, email: string, password: string) => {
  await axios.post(`${BASE_URL}/api/auth/register/`, { username, email, password });
};

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login/`, { username, password });
  if (typeof window !== 'undefined') {
    setCookie('access', res.data.access);
    setCookie('refresh', res.data.refresh);
    setCookie('user', JSON.stringify(res.data.user));
  }
};

const getAuthHeaders = () => {
  if (typeof document === 'undefined') return {};
  const access = getCookie('access');
  return access ? { Authorization: `Bearer ${access}` } : {};
};

export const getTodos = async () => {
  const res = await axios.get(`${BASE_URL}/api/auth/todo`, { headers: getAuthHeaders() });
  return res.data;
};

export const getTodoById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/api/auth/todo/${id}/`, { headers: getAuthHeaders() });
  return res.data;
};

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  due_date: string;
}

export const addTodo = async (todo: Todo) => {
  await axios.post(`${BASE_URL}/api/auth/todo/`, todo, { headers: getAuthHeaders() });
};

export const updateTodo = async (id: number, todo: Todo) => {
  await axios.put(`${BASE_URL}/api/auth/todo/${id}/`, todo, { headers: getAuthHeaders() });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${BASE_URL}/api/auth/todo/${id}/`, { headers: getAuthHeaders() });
};
