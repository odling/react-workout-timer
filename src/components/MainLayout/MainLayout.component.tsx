import { Outlet } from 'react-router-dom';
import { Navigation } from '../';

const MainLayout = () => {
  return (
    <>
      <header></header>
      <main className="container flex justify-center min-h-[500px] flex-1 w-full">
        <Outlet />
      </main>
      <footer id="footer" className="w-full md:w-[80%] lg:w-[50%]">
        <Navigation />
      </footer>
    </>
  );
};

export default MainLayout;
