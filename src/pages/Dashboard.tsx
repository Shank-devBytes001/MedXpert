
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { MedicalShopDashboard } from '@/components/dashboard/MedicalShopDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'medical-shop':
      return <MedicalShopDashboard />;
    default:
      return <div>Unknown user role</div>;
  }
};
