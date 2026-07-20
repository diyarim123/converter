import { Outlet } from 'react-router-dom';
import Home from '../pages/home';

export default function MainLayout() {
  return (
    <div className='h-screen w-[75%] m-0 grid grid-rows-[auto_1fr]'>
      <header>
        <Home />
      </header>

      <main className='main-content'>
        <Outlet />
      </main>
    </div>
  );
}