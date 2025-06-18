import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary-600 heading-1 animate-fade-in">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="card border-l-4 border-primary-500 shadow-soft p-8 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-primary-700 heading-2">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-800 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-800 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-800 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="auth-input"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
        
        <div className="card border-l-4 border-primary-500 shadow-soft p-8 animate-fade-in flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-primary-700 heading-2">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-primary-600 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-secondary-900">Email</h3>
                <p className="text-secondary-700">info@healthscriptai.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-primary-600 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-secondary-900">Phone</h3>
                <p className="text-secondary-700">+91 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-primary-600 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-secondary-900">Address</h3>
                <p className="text-secondary-700">
                  123 Tech Park, Sector 15<br />
                  Gurugram, Haryana 122001<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;