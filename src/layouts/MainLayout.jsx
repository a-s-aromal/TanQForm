import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <>
    <main className="px-4">
      <Outlet />
    </main>
  </>
);

export default MainLayout;
