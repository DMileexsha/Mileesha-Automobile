// src/Components/BookService.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import  {Button}  from "../Components/UI/button";
import { TextArea } from "../Components/UI/TextArea";
import { Input } from "../Components/UI/input";
import mylogo from "../assets/mylogo.png";





import { Calendar, Clock, Wrench, Car, Shield, Zap, CheckCircle, Phone, Mail } from "lucide-react";

const serviceTypes = [
  {
    id: "oil-change",
    name: "Oil Change",
    duration: "30 mins",
    price: "$45",
    description: "Complete oil and filter change with multi-point inspection",
    icon: Zap,
  },
  {
    id: "brake-service",
    name: "Brake Service",
    duration: "2 hours",
    price: "$150",
    description: "Brake pad replacement and brake system inspection",
    icon: Shield,
  },
  {
    id: "general-repair",
    name: "General Repair",
    duration: "Varies",
    price: "Quote",
    description: "Diagnostic and repair services for various vehicle issues",
    icon: Wrench,
  },
  {
    id: "maintenance",
    name: "Scheduled Maintenance",
    duration: "1-3 hours",
    price: "$120",
    description: "Regular maintenance based on manufacturer recommendations",
    icon: Car,
  },
];

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookServicePage() {
const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    customerName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    licensePlate: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service booking submitted:", bookingData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setBookingData({
        customerName: "",
        email: "",
        phone: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        licensePlate: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        additionalNotes: "",
      });
      setSelectedService("");
    }, 5000);
  };

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setBookingData({ ...bookingData, serviceType: serviceId });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-6">
  <     div className="max-w-xl mx-auto flex items-center gap-8">
    
        {/* Left: Logo */}
        <div className="flex-shrink-0">
        <img 
        src={mylogo} 
        alt="Logo" 
        className="w-29 h-auto object-contain" />
        </div>

    {/* Right: Heading and Paragraph */}
    <div className="text-center flex-1">
      <h1 className="text-4xl font-bold mb-4">Book Your Service</h1>
      <p className="text-xl text-red-100">Schedule your vehicle service with our expert technicians.</p>
    </div>
    
  </div>
</section>


        <button
          onClick={() => navigate("/")}></button>


        <div className="max-w-4xl mx-auto py-12 px-4">
          {isSubmitted ? (
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <CheckCircle className="mx-auto text-green-600 w-12 h-12" />
              <h2 className="text-2xl font-semibold text-green-700 mt-4">Booking Confirmed!</h2>
              <p className="text-gray-700 mt-2">We will contact you soon to confirm your appointment.</p>
              <p className="mt-2 text-sm text-gray-600">Phone: +1 (555) 123-4568 | Email: service@mileeshaautomobile.com</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Choose a Service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.id}
                        className={`border p-4 rounded-md cursor-pointer transition ${
                          selectedService === service.id ? "border-red-500 bg-red-50" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-5 h-5 text-red-600" />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="customerName" placeholder="Full Name" value={bookingData.customerName} onChange={handleChange} required />
                  <Input name="phone" placeholder="Phone Number" value={bookingData.phone} onChange={handleChange} required />
                  <Input name="email" placeholder="Email" value={bookingData.email} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Vehicle Info</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input name="vehicleYear" placeholder="Year" value={bookingData.vehicleYear} onChange={handleChange} required />
                  <Input name="vehicleMake" placeholder="Make" value={bookingData.vehicleMake} onChange={handleChange} required />
                  <Input name="vehicleModel" placeholder="Model" value={bookingData.vehicleModel} onChange={handleChange} required />
                </div>
                <Input className="mt-4" name="licensePlate" placeholder="License Plate" value={bookingData.licensePlate} onChange={handleChange} />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Schedule</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="preferredDate" type="date" min={today} value={bookingData.preferredDate} onChange={handleChange} required />
                  <select
                    name="preferredTime"
                    value={bookingData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <TextArea name="additionalNotes" placeholder="Additional Notes" value={bookingData.additionalNotes} onChange={handleChange} rows={4} />

              <div>
                <label className="inline-flex items-center">
                  <input type="checkbox" required className="mr-2" /> I agree to the terms and conditions
                </label>
              </div>

              <Button type="submit" className="bg-red-800 hover:bg-red-700 text-white w-full py-3" disabled={!selectedService}>
                Book Service
              </Button>

              
            </form>
          )}
        </div>
      </main>

      <Footer />


      
    </div>
  );
}
