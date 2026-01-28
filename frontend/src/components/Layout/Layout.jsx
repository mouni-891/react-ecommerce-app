import { Outlet } from "react-router-dom";
import Header from "@/Header/Header";
// import "./Layout.css";

function Layout() {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
