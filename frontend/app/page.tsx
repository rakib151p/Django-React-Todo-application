import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Make sure your login sets the 'access' cookie with path: '/' and not HttpOnly if you need client access
  const cookieStore = await cookies();
  const access = cookieStore.get('access');

  if (access && access.value) {
    redirect('/todo');
  } else {
    redirect('/login');
  }
  return null;
}
