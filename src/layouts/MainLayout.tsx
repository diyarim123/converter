import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function MainLayout() {
  return (
    <div className='h-screen w-[75%] m-0 grid grid-rows-[auto_1fr]'>
      <header>
        <Navbar />
      </header>

      <main className='main-content'>
        <Hero />
        <Outlet />
      </main>
    </div>
  );
}
