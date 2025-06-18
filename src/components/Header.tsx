import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header bg-white text-secondary-900 shadow-soft border-b-4 border-primary-500">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Stethoscope size={32} className="text-primary-600" />
          <span className="text-2xl font-bold text-primary-600">MedXpert</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li><Link to="/login" className="btn-secondary font-semibold rounded-full shadow-soft">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;