const Navbar = () => {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  return (
    <nav className="w-[100vw] fixed top-0 left-0 bg-white shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className=" flex flex-row items-center flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-700">
              MyBus
            </a>
            <p className="mx-10 text-xl text-black">{`Hey! ${name}`}</p>
          </div>

          <div className="hidden md:flex space-x-4">
            {role === "A" && (
              <a className="px-4 py-2 text-black" href="/create">
                Create Bus
              </a>
            )}
            {role == "U" && (
              <a className="px-4 py-2 text-black" href="/bookings">
                My Bookings
              </a>
            )}
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("name");
                localStorage.removeItem("id");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
