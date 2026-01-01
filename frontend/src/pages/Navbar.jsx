import { useState } from "react";

export const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* Left: Logo + Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="text-lg font-semibold text-gray-800">WEBSAGA</div>
            <span className="hidden md:inline text-sm text-gray-500">
              | Admin Panel
            </span>
          </div>

          {/* Center: Nav links (desktop) */}
          

          {/* Right: Admin profile */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff&rounded=true"
                  alt="Admin avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg py-1 z-20">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 pb-4 border-t">
            <div className="flex flex-col px-2 gap-2">
              <a
                href="#"
                className="px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Programs
              </a>
              <a
                href="#"
                className="px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Branches
              </a>
              <a
                href="#"
                className="px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Faculty
              </a>
              <a
                href="#"
                className="px-2 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Regulations
              </a>
              <div className="border-t pt-2">
                <div className="text-sm text-gray-700">Admin</div>
                <div className="text-xs text-gray-500 mb-2">
                  System Administrator
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-2 rounded text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
