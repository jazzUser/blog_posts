import { useState } from "react";
import Sidebar from "./Sidebar";
import DisplayContent from "./DisplayContent";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>(''); // State for selected tag

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Callback function to handle tag click from Sidebar
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag); // Set the selected tag for filtering
    setIsSidebarOpen(false); // Optionally close the sidebar on tag click
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onTagClick={handleTagClick} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <div
          className="navbar fixed top-0 left-0 w-full bg-base-300 flex justify-between h-16 z-10 shadow-md"
        >
          <div className="flex items-center space-x-2">
            <a className="btn btn-ghost text-xl">Blog posts</a>

            {/* Hamburger button */}
            <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <h2 className="btn btn-ghost">Sign In</h2>
            <div className="flex-none relative">
              <button
                className="btn btn-square btn-ghost"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-white shadow-lg rounded-lg">
                  <ul>
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm">
                        Sign in/Register
                      </button>
                    </li>
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm">
                        Example 1
                      </button>
                    </li>
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm">
                        Example 2
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DisplayContent */}
        <div className="pt-16"> {/* Account for fixed Navbar height */}
          <DisplayContent selectedTag={selectedTag} /> {/* Pass selectedTag to DisplayContent */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
