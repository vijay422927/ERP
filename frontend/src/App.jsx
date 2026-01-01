import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./pages/Navbar";
const rootLayout = () => {
  
  return (
    // <div className="flex">
    // <Sidebar />

    <div className="flex-1">
      <Navbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
    // </div>
  );
};

export default rootLayout;
