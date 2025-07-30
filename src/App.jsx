import React from 'react'
import Header from './Components/Header'
import HeroSection from './Components/heroSection'
import OurServices from './Components/OurServices'
import About from './Components/About'
import ContactPage from './Components/ContactPage'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReconditionedVehicles from './Components/ReconditionedVehicles';
import BookServicePage from './Components/BookService'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignIn from './Components/SignIn';

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

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<MainHomePage />} />
        <Route path='/reconditioned-Vehicles' element={<ReconditionedVehicles />} />
        <Route path="/book-service" element={<BookServicePage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};



export default App;
