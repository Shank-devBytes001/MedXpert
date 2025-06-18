import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Store } from 'lucide-react';

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
            Choose Registration Type
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-700">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
              Sign in
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Link
            to="/signup/doctor"
            className="bg-white p-8 rounded-lg text-center hover:bg-primary-50 transition-colors border-2 border-primary-100 hover:border-primary-500 shadow-soft"
          >
            <Stethoscope className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Doctor Registration</h3>
            <p className="text-secondary-700">Register as a healthcare provider</p>
          </Link>

          <Link
            to="/signup/medical"
            className="bg-white p-8 rounded-lg text-center hover:bg-primary-50 transition-colors border-2 border-primary-100 hover:border-primary-500 shadow-soft"
          >
            <Store className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Medical Store Registration</h3>
            <p className="text-secondary-700">Register your pharmacy or medical store</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;