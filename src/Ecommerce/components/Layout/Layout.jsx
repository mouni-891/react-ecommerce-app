import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className="app-content"></main>
      <Outlet />
    </>
  );
}

export default Layout;

