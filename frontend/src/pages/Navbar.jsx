
export const Navbar = () =>{
//   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // navigate("/");
  };

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left: App / Institution Name */}
      <div className="text-lg font-semibold text-gray-800">
        WEBSAGA | Admin Panel
      </div>

      {/* Right: Admin Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">Admin</p>
          <p className="text-xs text-gray-500">System Administrator</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
