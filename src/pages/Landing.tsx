
import React, { useState } from 'react';
import { MainNavigation } from '@/components/MainNavigation';
import { RoleCard } from '@/components/RoleCard';
import { LoginForm } from '@/components/LoginForm';
import { UserRole } from '@/types';

export const Landing: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  if (selectedRole) {
    return (
      <LoginForm 
        role={selectedRole} 
        onBack={() => setSelectedRole(null)} 
      />
    );
  }

  return (
    <>
      <MainNavigation onLoginSelect={setSelectedRole} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                MediReport Pro
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive medical reports and discharge summary management system designed for healthcare professionals, patients, and medical facilities.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Choose Your Role to Continue
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RoleCard
                  role="doctor"
                  title="Doctor Portal"
                  description="Create and manage patient reports, discharge summaries, and medical documentation with comprehensive tools."
                  onClick={() => setSelectedRole('doctor')}
                />
                
                <RoleCard
                  role="patient"
                  title="Patient Portal"
                  description="Access your medical reports, discharge summaries, and health records securely from anywhere."
                  onClick={() => setSelectedRole('patient')}
                />
                
                <RoleCard
                  role="medical-shop"
                  title="Medical Shop"
                  description="Manage prescriptions, track inventory, and process orders from doctors and patients efficiently."
                  onClick={() => setSelectedRole('medical-shop')}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="max-w-4xl mx-auto mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">About MediReport Pro</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & HIPAA Compliant</h3>
                  <p className="text-gray-600">Your medical data is protected with enterprise-grade security and encryption.</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
                  <p className="text-gray-600">Streamlined workflows that save time and improve patient care quality.</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Platform</h3>
                  <p className="text-gray-600">Used by healthcare professionals worldwide for reliable medical documentation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Doctors Section */}
          <div id="doctors" className="max-w-6xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Doctors</h2>
              <p className="text-gray-600">Connect with our experienced healthcare professionals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: '4.9', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face' },
                { name: 'Dr. Michael Chen', specialty: 'Neurology', rating: '4.8', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face' },
                { name: 'Dr. Emily Davis', specialty: 'Pediatrics', rating: '4.9', image: 'https://images.unsplash.com/photo-1594824047957-b4e3f6c1d934?w=150&h=150&fit=crop&crop=face' }
              ].map((doctor, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center justify-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-600">{doctor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Find Hospitals Section */}
          <div id="hospitals" className="max-w-4xl mx-auto mt-16 mb-16">
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Near Hospitals</h2>
              <p className="text-gray-600 mb-6">Locate the best healthcare facilities in your area</p>
              <div className="max-w-md mx-auto flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Enter your location" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
