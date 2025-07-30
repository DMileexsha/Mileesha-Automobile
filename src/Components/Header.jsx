import React, { useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import mylogo from '../assets/mylogo.png';
import { HashLink } from 'react-router-hash-link';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          <div className="flex items-center space-x-2">
            <img 
            src={mylogo} 
            alt="Logo" 
            className="h-17  w-auto object-contain" />

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
            <a href='/signin' className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50">Sign in</a>
            <a href='/book-service' className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Book Service</a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-red-600">Home</a>
              <a href="#vehicles" className="text-gray-700 hover:text-red-600">Vehicles</a>
              <a href="#services" className="text-gray-700 hover:text-red-600">Services</a>
              <a href="#about" className="text-gray-700 hover:text-red-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600">Contact</a>

              <div className="flex flex-col space-y-2 pt-4">
                <button className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 cursor-pointer">Sign in</button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer">Book Service</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
