import { Facebook } from 'lucide-react'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'


export function Footer () {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid md:grid-cols-4 gap-8'>
            <div className='col-span-2 md:col-span-1'>
                <div className='flex items-center space-x-2 mb-4'>

                </div>
                <p className='text-gray-400 mb-4'>
                    Your trusted automotive partner for over 15 years. Quality vehicles, expert service, and customer
              satisfaction guaranteed.
                </p>
                <div className='flex space-x-4'>
                  <a href='https://www.facebook.com/share/1RECstLzbc/?mibextid=wwXIfr' target='_blank' rel='noopener noreferrer'>
                    <Facebook className='h-5 w-5 text-gray-400 hover:text-white cursor-pointer'/>
                  </a>

                  <a href='https://wa.me/94741647998' target='_blank' rel='noopener noreferrer'>
                    <BsWhatsapp className='h-5 w-5 text-gray-400 hover:text-white cursor-pointer'/>
                  </a>
                </div>
            </div>
            <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#vehicles" className="text-gray-400 hover:text-white">
                  Vehicles
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
  <h3 className="text-lg font-semibold mb-4">Our Services</h3>
  <ul className="space-y-2">
    <li>
      <a href="#engine" className="text-gray-400 hover:text-white">Engine Repair</a>
    </li>
    <li>
      <a href="#brake" className="text-gray-400 hover:text-white">Brake Service</a>
    </li>
    <li>
      <a href="#battery" className="text-gray-400 hover:text-white">Battery Check</a>
    </li>
    <li>
      <a href="#tire" className="text-gray-400 hover:text-white">Tire Replacement</a>
    </li>
  </ul>
</div>

<div>
  <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
  <ul className="space-y-2 text-gray-400">
    <li><span className="text-white font-medium">Proprietor:</span> K.H.V.S. Perera</li>

    <li className="flex items-center gap-2">
    <i className="fi fi-rr-envelope text-white text-lg"></i>
    <a href="mailto:sanjeewaperera@gmail.com" className="hover:underline">
    sanjeewaperera@gmail.com
    </a>
    </li>

    <li className="flex items-center gap-2">
      <i className="fi fi-rr-phone-call text-white text-lg"></i>
      <a href="tel:0703866252" className="hover:underline">
        0703866252
      </a>
    </li>
    <li className="flex items-center gap-2">
        <i className="fi fi-rr-marker text-white text-lg">
            </i>Address:No 22, Sankamali, Kehelbaddara, Udugampola</li>
  </ul>
</div>


          
</div>
</div>
     <div className="border-t border-gray-800 mt- pt-9 text-center text-gray-400">
      <p className="-mt-9">&copy; {new Date().getFullYear()} Mileesha Automobile. All rights reserved.</p>
    </div>   

    
</footer>
  )
}

export default Footer
