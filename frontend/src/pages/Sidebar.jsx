import { Link, useRouterState } from "@tanstack/react-router";

export const Sidebar = () => {
  const { location } = useRouterState();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Programs", path: "/programs" },
    { label: "Manage Branches", path: "/branches" },
    { label: "Manage Regulations", path: "/regulations" },
    { label: "Manage Courses", path: "/courses" },
    { label: "Manage Faculty", path: "/faculty" },
  ];
  //     { label: "QP Generation", path: "/admin/qp-generation" },

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen">
      {/* App / Institution Name */}
      <div className="p-5 text-lg font-bold border-b border-slate-700">
        WEBSAGA
        <p className="text-xs font-normal text-slate-300">Academic ERP</p>
      </div>

      {/* Menu */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-5 py-3 text-sm hover:bg-slate-700 transition ${
              location.pathname === item.path
                ? "bg-slate-700 font-semibold"
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
