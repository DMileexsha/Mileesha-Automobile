import React, { useEffect, useState } from 'react'
import { FiPhone } from 'react-icons/fi';
import car from '../assets/car.png';
import { ChevronLeft } from 'lucide-react';
import bg from '../assets/bg.jpg';
import { useNavigate } from 'react-router-dom';



export function HeroSection () {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide]= useState(0)
    const [isAutoScrolling , setIsAutoScrolling]= useState(true)
    
    useEffect (()=>{
        if (isAutoScrolling){
            const interval = setInterval (()=>{
                setCurrentSlide ((prev)=> (prev === 0 ? 1: 0))
            }, 8000)
            return ()=> clearInterval (interval)
        }
    },[isAutoScrolling])

    const scrollToSlide = (index)=> {
        setCurrentSlide(index)
        setIsAutoScrolling(false)
        setTimeout (()=> setIsAutoScrolling(true), 1000)
    }


  return (
    <section id='home' className='relative overflow-hidden w-full h-screen'>
    <div
        className="flex transition-transform duration-700 ease-in-out w-full h-screen"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        
    
    <div className="w-full flex-shrink-0 h-screen relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
    <div className='absolute inset-0 bg-black opacity-50'></div>
    
    <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full grid lg:grid-cols-2 gap-12 items-center'>
    <div className='grid lg:grid-cols-[3fr_2fr] gap-12 items-center h-full' >
        <div className='space-y-8 h-full flex flex-col justify-center pr-6'>
            <h1 className='text-6xl lg:text-5xl font-bold leading-tight'>Your Trusted 
            <span className='text-red-500'>Automobile</span>
            <br/> partner
            </h1>

            <p className='text-xl text-gray-300 leading-tight'>
                Mileesha Automobile is a trusted automotive service center specializing in 4-wheel vehicle repairs and gearbox solutions.
                Whether it's a minor fix or a complex gearbox issue, our goal is to deliver efficient, affordable, and long-lasting solutions.
                At Mileesha Automobile, customer satisfaction and vehicle safety are our top priorities.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
                <a href='tel:94741647998'>
                <button
                     className='flex items-center border border-white text-white hover:bg-white hover:text-gray-900 px-7 py-3 rounded cursor-pointer'>
                        <FiPhone className='mr-2 h-5 w-5' />
                             Call now
                     </button>
                </a>
            </div>
        </div>
        
    </div>
        <div>
            <img
               src={car}
               className='w-[1000px] animate-float '/>
        </div>
       
    </div>  
</div>

<div className='w-full h-screen flex-shrink-0 relative text-white'>
<img 
    src={bg}
    fill
    className='w-full h-full object-cover absolute inset-0'
    />

    
<div className='absolute inset-0 bg-black opacity-60'></div>
<div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>
    <h2 className='text-4xl lg:text-5xl font-bold mb-6'>Reconditioned Vehicles</h2>
    <button 
       size='lg'
       className='bg-red-500 hover:bg-red-600 text-white font-semibold rounded cursor-pointer px-7 py-3'
       onClick={() => navigate('/reconditioned-Vehicles')}>

        View Vehicles
       </button>
</div>
</div>
</div>

<div className='absolute top-1/2 left-4 transform -translate-y-1/2 z-20'>
<button onClick={()=> scrollToSlide (currentSlide ===0? 1 : 0)}>
   <ChevronLeft className='h-6 w-6 text-white hover:text-yellow-400 transition'/>
</button>
</div>

<div className='absolute top-1/2 right-4 transform -translate-y-1/2 z-20'>
<button onClick={()=> scrollToSlide (currentSlide ===0? 1 : 0)}>
    <ChevronLeft className='h-6 w-6 text-white hover:text-yellow-400 transition'/>
</button>
</div>


<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3'>
  {[0,1].map ((index)=>(
    <button 
       key={index}
       onClick={()=> scrollToSlide(index)}
       className={`w-3 h-3 rounded-full ${
        currentSlide === index ? "bg-red-500 scale-125" : "bg-white/50 hover:bg-white/75"} transition-all`}
    />
  ))}
</div>



</section>
  );
}

export default HeroSection;
