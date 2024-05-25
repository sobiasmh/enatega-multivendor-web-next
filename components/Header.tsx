
const Header = () => {
  return (
    <header className="bg-white-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div> {/* Logo */}
          <div className="ml-4">Your Brand</div> {/* Brand Name */}
        </div>

        {/* Middle */}
        <div>Navigation Text</div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
            <a className="text-white hover:text-gray-300">Account</a>
          <button className="text-white hover:text-gray-300">Login</button>
          <button className="text-white hover:text-gray-300">Sign Up</button>
          <div className="relative">
            <button className="text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4a2 2 0 012-2h12a2 2 0 012 2v2.5m-3-2.5V6a4 4 0 00-4-4H9a4 4 0 00-4 4v0a4 4 0 00-4 4v2.5m3-2.5h12"
                />
              </svg>
            </button>
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white flex items-center justify-center text-xs">2</span> {/* Cart count */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
