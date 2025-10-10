import React, { useState } from 'react'



import { MapPin, Phone, Mail, Clock } from 'lucide-react'



export function ContactPage () {
    const [formData, setFormData]= useState({
        name:"",
        email:"",
        phone:"",
        message:"",

    })

const [isSubmitted, setIsSubmitted] = useState(false);

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Form Submitted Successfully");
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else {
      console.error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience the Mileesha Automobile difference? Contact us today for all your automotive needs.
          </p>
        </div>
        {isSubmitted && (
          <div className="max-w-5xl mx-auto mb-6 p-4 bg-green-100 text-green-800 rounded">
            Your message was sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-gray-100 p-8 rounded-xl shadow-md">
          <div className="mb-4">
          <h1 className='text-4xl font-bold text-black mb-6'>Send Us a Message</h1>
          <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
           />
          </div>
         <div className="w-full">
         <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
         <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
           />
          </div>
       </div>
</div>

      

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 w-full font-semibold"
          >
            Send Us a Message
          </button>
        </form>
        
      </div>
    </section>
  )
}
    
  


export default ContactPage;