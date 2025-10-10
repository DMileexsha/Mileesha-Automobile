import React, { useState, useContext, useRef, useEffect } from 'react';
import mylogo from '../assets/mylogo.png';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import userImg from '../assets/user.png';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={mylogo} 
              alt="Logo" 
              className="h-16 w-auto object-contain" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <HashLink smooth to="/#home" className="text-gray-700 hover:text-red-600">Home</HashLink>
            <HashLink smooth to="/#services" className="text-gray-700 hover:text-red-600">Services</HashLink>
            <HashLink smooth to="/#about" className="text-gray-700 hover:text-red-600">About</HashLink>
            <HashLink smooth to="/#contact" className="text-gray-700 hover:text-red-600">Contact</HashLink>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Profile Dropdown Container */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="flex items-center"
                  >
                  <img 
                    src={userImg}
                    alt="User profile picture" 
                    className="w-9 h-9 rounded-full border border-white"
                  />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute  mt-3 w-30 bg-white rounded-lg shadow-lg">
                      <button 
                        onClick={logout} 
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gradient-to-r from-gray-900 to-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                {/* Book Service Button */}
                <a 
                  href='/book-service' 
                  className="bg-gradient-to-r from-gray-900 to-gray-700 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Book Service
                </a>
              </>
            ) : (
              <>
                <a 
                  href='/signin' 
                  className="border border-gradient-to-r from-gray-900 to-gray-700 text-gradient-to-r from-gray-900 to-gray-700 px-4 py-2 rounded-lg hover:bg-white"
                >
                  Sign in
                </a>
                <a 
                  href='/book-service' 
                  className="bg-gradient-to-r from-gray-900 to-gray-700hover:bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Book Service
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            <HashLink smooth to="/#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600">Home</HashLink>
            <HashLink smooth to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600">Services</HashLink>
            <HashLink smooth to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600">About</HashLink>
            <HashLink smooth to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600">Contact</HashLink>
            {user ? (
              <>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <a 
                href='/signin' 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
              >
                Sign in
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
