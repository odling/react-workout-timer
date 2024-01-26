import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex justify-center w-full h-full bg-red-500">
      <header></header>
      <main className="container h-full w-full">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
