
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser, UserRole } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demonstration
const mockUsers = {
  doctor: {
    id: 'doc-1',
    role: 'doctor' as UserRole,
    profile: {
      id: 'doc-1',
      name: 'Dr. Sarah Johnson',
      email: 'doctor@demo.com',
      specialization: 'Cardiology',
      licenseNumber: 'MD12345',
      hospitalId: 'hosp-1',
      department: 'Cardiology',
      phoneNumber: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    }
  },
  patient: {
    id: 'pat-1',
    role: 'patient' as UserRole,
    profile: {
      id: 'pat-1',
      name: 'John Smith',
      email: 'patient@demo.com',
      phoneNumber: '+1 (555) 987-6543',
      dateOfBirth: '1985-06-15',
      gender: 'male' as const,
      address: '123 Main St, City, State 12345',
      emergencyContact: '+1 (555) 111-2222',
      insuranceId: 'INS123456',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'admitted' as const
    }
  },
  'medical-shop': {
    id: 'shop-1',
    role: 'medical-shop' as UserRole,
    profile: {
      id: 'shop-1',
      name: 'MediCare Pharmacy',
      email: 'shop@demo.com',
      licenseNumber: 'PH78910',
      address: '456 Health Ave, Medical District',
      phoneNumber: '+1 (555) 456-7890',
      ownerName: 'Michael Brown',
      establishedYear: 2010,
      avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop'
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login - accept any password
    if (email === `${role}@demo.com`) {
      setUser(mockUsers[role]);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
