import React from 'react'
import frontcar from '../assets/carfront.png';
import engineImg from '../assets/engine.png';
import tireImg from '../assets/tire.png';
import batteryImg from '../assets/battery.png';
import oilImg from '../assets/oil.png';
import brakeImg from '../assets/brake.png';


const Services = [
  {
     
    title: 'Engine Repair',
    description: 'Fix engine issues for smooth rides.',
    img: engineImg,
  },
  {
    title: 'Tire Replacement',
    description: 'Replace worn-out or damaged tires to ensure safe and smooth driving',
    img: tireImg,
  },
  {
    title: 'Battery Check',
    description: 'Check battery health and power.',
    img: batteryImg,
  },
  {
    title: 'Oil Change',
    description: 'Extend engine life with regular high-quality oil changes.',
    img: oilImg,
  },
  {
    title: 'Brake Service',
    description: 'Ensure your brakes are reliable and safe for every ride.',
    img : brakeImg,
  },
  
];


const OurServices = () => {
  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sales to service, we provide comprehensive automotive solutions to meet all your vehicle needs under
            one roof.
          </p>
        </div>

        <div className='hidden lg:block relative'>
          <div className='relative h-[600px] w-full'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10'>
            <div className='relative animate-float'>
              <img
                    src={frontcar}
                    className='opacity-90'/>
            </div>
            
            {Services.map((service,index) => {
              const total = Services.length;
              const arcAngle = Math.PI * 0.9;
              const angleOffset = (Math.PI - arcAngle) / 2;
              const angle = angleOffset + (index / (total - 1)) * arcAngle;
               
              const radius = 410;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

             return (
          <div
            key={index}
            className="absolute"
            style={{
            top: `calc(55% - ${y}px)`,
            left: `calc(50% + ${x}px)`,
            transform: 'translate(-50%, -50%)',
           }}
           >
          <div className="shadow-md rounded-xl w-38 h-38 flex flex-col items-center justify-center p-2 text-center">
          <img src={service.img} alt={service.title} className="w-12 h-12 mb-1" />
          <p className="text-xs font-semibold">{service.title}</p>
          <p className="text-[10px] mt-1 text-gray-600">{service.description}</p>
          </div>
          </div>
          );
          
          })}
          </div>
        </div>
       {/* Mobile-friendly layout */}
       <div className="lg:hidden grid grid-cols-2 gap-4 mt-8 px-4">
      {Services.map((service, index) => (
      <div key={index} className="flex flex-col items-center text-center shadow-md p-4 rounded-xl">
      <img src={service.img} alt={service.title} className="w-10 h-10 mb-2" />
      <p className="text-sm font-semibold">{service.title}</p>
      <p className="text-xs text-gray-600 mt-1">{service.description}</p>
    </div>
  ))}
</div>

      
      </div>
    </div>
          
      
      
  </section>
  )
}

export default OurServices;
