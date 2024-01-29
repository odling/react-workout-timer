import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <header></header>
      <main className="container h-full w-full">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default MainLayout;
