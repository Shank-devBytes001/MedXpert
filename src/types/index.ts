
export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  hospitalId: string;
  department: string;
  phoneNumber: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  insuranceId?: string;
  avatar?: string;
  status: 'admitted' | 'discharged' | 'partially-admitted' | 'reappointment';
}

export interface MedicalShop {
  id: string;
  name: string;
  email: string;
  licenseNumber: string;
  address: string;
  phoneNumber: string;
  ownerName: string;
  establishedYear: number;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine-checkup';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  department: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalName: string;
  reportType: 'lab' | 'imaging' | 'discharge' | 'prescription';
  title: string;
  description: string;
  findings: string;
  recommendations: string;
  medications?: Medication[];
  dateCreated: string;
  dateUpdated: string;
  status: 'draft' | 'completed' | 'shared';
  fileUrl?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  medications: Medication[];
  dateIssued: string;
  validUntil: string;
  notes?: string;
  status: 'active' | 'expired' | 'completed';
  refillsRemaining: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export type UserRole = 'doctor' | 'patient' | 'medical-shop';

export interface AuthUser {
  id: string;
  role: UserRole;
  profile: Doctor | Patient | MedicalShop;
}
