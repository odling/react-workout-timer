import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex justify-center w-full h-full py-unit-lg">
      <header></header>
      <main className="container h-full w-full">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
