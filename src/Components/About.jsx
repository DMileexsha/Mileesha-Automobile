import React from 'react'
import mylogo from '../assets/mylogo.png';


export function About () {
  return (
    <section id='about' className='relative from-gray-900 to-gray-700 text-white'>
        <div className='hidden md:block absolute inset-0 left-0 top-0 w-full h-full skew-y-[-10deg] bg-gradient-to-r from-gray-900 to-gray-900 z-0 pointer-events-none'></div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
            <h2 className='text-4xl font-bold text-white -900 mb-6'><br/>About Us</h2>
            <p className='text-lg text-gray-500 mb-6'><br/>With over 15 years of excellence in the automotive industry, 
                Mileesha Automobile has been the trusted
              partner for thousands of customers. We pride ourselves on delivering exceptional service, quality
              vehicles, and unmatched customer satisfaction.</p>
            </div>
            <div className='w-full'>
            <img
              src={mylogo}
              alt="About Mileesha Automobile"
              className=' w-[500px] h-auto  mx-auto rounded-xl shadow-lg'
            />
          </div>
        </div>
      </div>
      

    </section>
  )
}

export default About
