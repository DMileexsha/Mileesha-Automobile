import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Wrench, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import toyota from '../assets/toyota.png';
import hondafit from '../assets/hondafit.png';
import wagonr from '../assets/wagonr.png';

const Vehicles = [
  {
    name: 'Toyota Aqua',
    model: '2019',
    originalPrice: 'LKR 5.2M',
    expectedPrice: 'LKR 4.8M',
    price: 'LKR 4.8M',
    status: 'Under Maintenance',
    progress: 75,
    completionDate: '2025-08-15',
    workRemaining: ['Engine tuning', 'Paint job', 'Tire replacement'],
    image: toyota,
  },
  {
    name: 'Honda Fit',
    model: '2018',
    originalPrice: 'LKR 4.5M',
    expectedPrice: 'LKR 4.2M',
    price: 'LKR 4.2M',
    status: 'Ready',
    progress: 100,
    completionDate: '2025-07-10',
    workRemaining: [],
    image: hondafit,
  },
  {
    name: 'Wagon R',
    model: '2016',
    originalPrice: 'LKR 5.8M',
    expectedPrice: 'LKR 5.5M',
    price: 'LKR 5.5M',
    status: 'In Progress',
    progress: 50,
    completionDate: '2025-09-01',
    workRemaining: ['Dashboard replacement', 'AC fix'],
    image: wagonr,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Ready':
      return 'bg-green-500 text-white';
    case 'Under Maintenance':
      return 'bg-red-500 text-white';
    case 'In Progress':
      return 'bg-yellow-500 text-black';
    default:
      return 'bg-gray-500 text-white';
  }
};

export function ReconditionedVehicles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const vehicle = Vehicles[currentIndex];
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/#home');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Vehicles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Vehicles.length) % Vehicles.length);
  };

  return (
    
    <div className='flex h-screen bg-gray-400'>
      {/* Left: Image & Status */}
      <div className='relative w-3/4 flex items-center justify-center p-8 bg-white'>
        <button onClick={handlePrev} className='absolute left-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full'>
          <ChevronLeft size={20} />
        </button>

        <img
          src={vehicle.image || '/placeholder.svg'}
          alt={vehicle.name}
          className='rounded-xl max-h-[90%]'
        />

        <button onClick={handleNext} className='absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full'>
          <ChevronRight size={20} />
        </button>

        <div className={`absolute top-5 right-5 px-3 py-1 text-sm rounded-full font-semibold ${getStatusColor(vehicle.status)}`}>
          {vehicle.status}
        </div>

        <div className='absolute bottom-5 left-5 right-5'>
          <div className='bg-black/30 h-2 rounded-full'>
            <div className='bg-yellow-400 h-2 rounded-full' style={{ width: `${vehicle.progress}%` }}></div>
          </div>
          <p className='text-white text-xs mt-1'>{vehicle.progress}% Complete</p>
        </div>
      </div>

      {/* Right: Info */}
      <div className='w-1/4 p-6 bg-gray-50 flex flex-col justify-between shadow-lg'>
        <div className='bg-gray-800 text-white rounded-lg p-5 flex flex-col justify-between h-full'>
          <div>
            <h3 className='text-xl font-bold mb-4'>{vehicle.name}</h3>

            <div className='space-y-2 mb-4'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-300'>Original:</span>
                <span className='line-through text-gray-400'>{vehicle.originalPrice}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-300'>Expected:</span>
                <span className='text-yellow-400 font-bold'>{vehicle.expectedPrice}</span>
              </div>
            </div>

            <div className='space-y-2 mb-4 text-xs text-gray-300'>
              <div className='flex items-center'>
                <Calendar className='h-3 w-3 mr-1' />
                Ready by: {new Date(vehicle.completionDate).toLocaleDateString()}
              </div>
              <div className='flex items-center'>
                <Wrench className='h-3 w-3 mr-1' />
                {vehicle.workRemaining.length} tasks remaining
              </div>
            </div>

            {vehicle.workRemaining.length > 0 && (
              <div className='mb-4'>
                <p className='text-xs text-gray-400 mb-1'>Remaining Work:</p>
                <div className='flex flex-wrap gap-1'>
                  {vehicle.workRemaining.slice(0, 2).map((work, i) => (
                    <span key={i} className='px-2 py-1 border text-xs rounded text-gray-300 border-gray-500'>
                      {work}
                    </span>
                  ))}
                  {vehicle.workRemaining.length > 2 && (
                    <span className='px-2 py-1 border text-xs rounded text-gray-300 border-gray-500'>
                      +{vehicle.workRemaining.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='flex items-left justify-center h-screen'>
      <button
        onClick={goHome}
        className='absolute top-6 left-6  text-black'
      >
        <i class="fi fi-rr-arrow-small-left text-2xl"></i>
      </button>
      </div>

          <button className='w-full bg-red-500 hover:bg-red-600 text-black py-2 rounded font-semibold text-sm flex items-center justify-center mt-4'>
            <DollarSign className='h-3 w-3 mr-1' />
            Reserve Now
          </button>
        </div>
        
      </div>
    </div>

    
    
  );
}

export default ReconditionedVehicles;
