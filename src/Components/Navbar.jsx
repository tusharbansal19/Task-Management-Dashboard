import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Create",  path: "/tasks" },
    { label: "About",  path: "/" },
    { label: "Contact", path: "/" },
   // Added Studio Page
  ];

  return (
    <nav className="fixed z-50 w-full text-white p-4 shadow-md bg-[#2A265F]">
      <div className="relative z-10 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="./image/Screenshot 2024-11-29 203826.png"
            alt="Logo"
            className="h-[40px]"
          />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="block md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <div className="flex">
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex bg-black md:bg-transparent transition-transform duration-300 ${
              menuOpen ? "translate-y-0" : "translate-y-[-300px]"
            } md:translate-y-0`}
          >
            {/* Sliding Box Effect */}
            <div
              className={`absolute bg-purple-800 bg-opacity-50 rounded-lg transition-all duration-300 hidden md:block`}
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                left:
                  activeIndex !== null
                    ? `${(activeIndex * 100) / menuItems.length}%`
                    : "-100%",
                width:
                  activeIndex !== null
                    ? `calc(100% / ${menuItems.length})`
                    : "0",
                height: "40px",
              }}
            ></div>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative z-50 px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer hover:text-yellow-300 transition-colors duration-300"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link
                  to={item.path}
                  className="flex items-center space-x-2"
                  onClick={() => setMenuOpen(false)} // Close menu when an item is clicked
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <img
            src=""
            alt="user"
            className="w-10 h-10 rounded-full bg-white hover:bg-opacity-25"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
