import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import OurServices from './Components/OurServices';
import About from './Components/About';
import ContactPage from './Components/ContactPage';
import Footer from './Components/Footer';
import ReconditionedVehicles from './Components/ReconditionedVehicles';
import ReservedVehicles from "./Components/ReservedVehicles";
import BookServicePage from './Components/BookService';
import SignIn from './Components/SignIn';
import { AuthProvider } from './Context/AuthContext';

const MainHomePage = () => {
  return (
    <div>
      <Header/>
      <main>
        <div id='home'><HeroSection/></div>
        <div id='services'><OurServices/></div>
        <div id='about'><About/></div>
        <div id='contact'><ContactPage/></div>
        <div id='footer'><Footer/></div>
      </main>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainNavbar() {
  const location = useLocation();
  const isMainDashboard = location.pathname === '/vehicles' || location.pathname === '/reserved';
  const isHomePage = location.pathname === '/';

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

const App = () => {
  return(
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MainNavbar/>
        <Routes>
          <Route path='/' element={<MainHomePage />} />
          <Route path='/reconditioned-vehicles' element={<ReconditionedVehicles />} />
          <Route path="/vehicles" element={<ReconditionedVehicles />} />

          <Route path="/reserved" element={<ReservedVehicles />} />
          <Route path="/book-service" element={<BookServicePage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;