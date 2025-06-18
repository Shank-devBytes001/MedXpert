import React from 'react';
import { Target, Zap, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-white">
      <h1 className="text-4xl font-bold text-center mb-12 text-secondary-900">About MedXpert</h1>
      
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-secondary-900">Our Mission</h2>
        <p className="text-lg text-secondary-700 mb-8">
          MedXpert is dedicated to accelerating India's healthcare digitization by providing cutting-edge solutions for medical record management. Our mission is to bridge the gap between paper-based records and the digital health ecosystem, ensuring seamless integration with the Unified Health Interface (UHI).
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-secondary-200">
            <Target className="text-primary-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-secondary-900">Vision</h3>
            <p className="text-secondary-700">To create a fully digitized, efficient, and accessible healthcare system across India.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-secondary-200">
            <Zap className="text-primary-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-secondary-900">Innovation</h3>
            <p className="text-secondary-700">Leveraging machine learning to interpret and digitize medical records accurately.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-secondary-200">
            <Shield className="text-primary-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-secondary-900">Security</h3>
            <p className="text-secondary-700">Ensuring the highest standards of data privacy and security in handling sensitive medical information.</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-secondary-900">Our Approach</h2>
        <p className="text-lg text-secondary-700 mb-4">
          MedXpert combines state-of-the-art cloud vision OCR technology with a fine-tuned model to accurately interpret handwritten medical information. Our system not only addresses the backlog of existing paper records but also provides real-time recognition of doctors' digital handwriting.
        </p>
        <p className="text-lg text-secondary-700 mb-4">
          By predicting drug names and supporting the ongoing digital transformation of healthcare, we're paving the way for a more efficient, accurate, and integrated healthcare system in India.
        </p>
      </div>
    </div>
  );
};

export default About;