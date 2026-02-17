import { Outlet } from "react-router-dom";
import Header from "@/Header/Header";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="app-wrapper">
      <Header />

      <main className="app-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
