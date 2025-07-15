import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const access = cookieStore.get('access');
  if (access && access.value) {
    redirect('/todos');
  } else {
    redirect('/login');
  }
  return null;
}
