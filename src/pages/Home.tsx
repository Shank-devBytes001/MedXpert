import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Pill, Shield, Heart, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleDoctorSignUp = () => {
    navigate('/doctor/signup');
  };

  const handleMedicalSignUp = () => {
    navigate('/medical/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="animate-fade-in">
              <h1 className="text-6xl font-bold mb-6 text-secondary-900">
                Welcome to MedXpert
              </h1>
              <p className="text-2xl mb-10 text-secondary-700">
                Revolutionizing Healthcare Management
              </p>
              <button 
                onClick={handleLogin}
                className="btn-primary text-lg font-bold px-10 py-4 rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-primary-100 hover:transform hover:scale-105 transition duration-300 shadow-soft">
              <User className="text-primary-400 w-12 h-12 mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-secondary-900">For Doctors</h3>
              <p className="text-secondary-700 mb-6">Manage your practice efficiently with our comprehensive doctor dashboard.</p>
              <button 
                onClick={handleDoctorSignUp}
                className="btn-primary px-6 py-3 rounded-md"
              >
                Register as Doctor
              </button>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-primary-100 hover:transform hover:scale-105 transition duration-300 shadow-soft">
              <Pill className="text-primary-400 w-12 h-12 mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-secondary-900">For Medical Stores</h3>
              <p className="text-secondary-700 mb-6">Streamline your pharmacy operations with our advanced management system.</p>
              <button 
                onClick={handleMedicalSignUp}
                className="btn-primary px-6 py-3 rounded-md"
              >
                Register as Medical Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-secondary-900 mb-16">Why Choose MedXpert?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-primary-100 hover:transform hover:scale-105 transition duration-300 shadow-soft">
              <Heart className="text-primary-400 w-12 h-12 mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-secondary-900">Smart Healthcare</h3>
              <p className="text-secondary-700">Digitally generated prescription management for better patient care.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-primary-100 hover:transform hover:scale-105 transition duration-300 shadow-soft">
              <Shield className="text-primary-400 w-12 h-12 mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-secondary-900">Secure Records</h3>
              <p className="text-secondary-700">End-to-end encrypted patient data with uhid protection.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-primary-100 hover:transform hover:scale-105 transition duration-300 shadow-soft">
              <Clock className="text-primary-400 w-12 h-12 mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-secondary-900">Real-time Access</h3>
              <p className="text-secondary-700">Instant access to medical records anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-secondary-900">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-2xl mb-10 text-secondary-700">
            Join MedXpert and be part of India's digital health revolution.
          </p>
          <button 
            onClick={handleLogin}
            className="btn-primary text-lg font-bold px-10 py-4 rounded-full"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;