import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function MainNavbar() {
  const location = useLocation();
  const isMainDashboard = location.pathname === '/vehicles' || location.pathname === '/reserved';

  return (
    <>
      {isMainDashboard && (
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/vehicles">Vehicles</Link>
          <Link to="/reserved">My Reservations</Link>
        </nav>
      )}
    </>
  );
}

export default MainNavbar;