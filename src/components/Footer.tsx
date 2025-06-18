import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer py-10 shadow-soft border-t-4 border-primary-500 bg-white text-secondary-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 text-primary-600">MedXpert</h3>
            <p className="text-sm text-secondary-700">Accelerating India's Healthcare Digitization</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2 text-primary-600">Quick Links</h4>
            <ul className="text-sm space-y-1">
              <li><a href="/" className="link">Home</a></li>
              <li><a href="/about" className="link">About Us</a></li>
              <li><a href="/contact" className="link">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2 text-primary-600">Contact</h4>
            <p className="text-sm text-secondary-700">Email: <span className="text-primary-600">info@medxpert.com</span></p>
            <p className="text-sm text-secondary-700">Phone: <span className="text-primary-600">+91 123 456 7890</span></p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-secondary-500">
          &copy; {new Date().getFullYear()} <span className="text-primary-600 font-semibold">MedXpert</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;