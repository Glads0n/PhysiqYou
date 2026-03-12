import { Outlet } from "react-router-dom";
import Navbar from "../components/DashNavbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}