import { Outlet } from 'react-router-dom';
import Home from '../pages/home';

export default function MainLayout() {
  return (
    <div className='flex flex-col gap-5 items-center'>
      <header>
        <Home />
      </header>

      <main className='flex flex-col gap-5'>
        <Outlet />
      </main>
    </div>
  );
}