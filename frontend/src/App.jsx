import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./pages/Navbar";
import { Sidebar } from "./pages/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* side bar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 flex ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
