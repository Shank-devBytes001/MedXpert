
import React, { useState } from 'react';
import { PatientSearch } from '@/components/patient/PatientSearch';
import { PatientProfile } from '@/components/patient/PatientProfile';
import { AppointmentScheduler } from '@/components/patient/AppointmentScheduler';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Patient, Appointment, MedicalReport, Prescription } from '@/types';

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: '1234567890',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-01-25',
    time: '10:00 AM',
    type: 'follow-up',
    status: 'scheduled',
    department: 'Cardiology'
  },
  {
    id: 'apt2',
    patientId: '1234567890',
    doctorId: 'doc2',
    doctorName: 'Dr. Michael Chen',
    date: '2024-01-15',
    time: '2:30 PM',
    type: 'consultation',
    status: 'completed',
    department: 'Neurology'
  }
];

const mockReports: MedicalReport[] = [
  {
    id: 'rep1',
    patientId: '1234567890',
    doctorId: 'doc1',
    hospitalName: 'Springfield General Hospital',
    reportType: 'lab',
    title: 'Blood Test Results',
    description: 'Complete blood count and lipid panel',
    findings: 'All values within normal range',
    recommendations: 'Continue current medication',
    dateCreated: '2024-01-20',
    dateUpdated: '2024-01-20',
    status: 'completed',
    fileUrl: '/reports/blood-test-2024-01-20.pdf'
  }
];

const mockPrescriptions: Prescription[] = [
  {
    id: 'presc1',
    patientId: '1234567890',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Johnson',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food'
      }
    ],
    dateIssued: '2024-01-20',
    validUntil: '2024-02-20',
    status: 'active',
    refillsRemaining: 2
  }
];

export const PatientManagement: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showCreatePatient, setShowCreatePatient] = useState(false);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleScheduleAppointment = () => {
    setShowScheduler(true);
  };

  const handleCreateNewPatient = () => {
    setShowCreatePatient(true);
  };

  if (selectedPatient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedPatient(null)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Search
            </button>
          </div>
        </div>
        
        <PatientProfile
          patient={selectedPatient}
          appointments={mockAppointments.filter(apt => apt.patientId === selectedPatient.id)}
          medicalReports={mockReports.filter(rep => rep.patientId === selectedPatient.id)}
          prescriptions={mockPrescriptions.filter(presc => presc.patientId === selectedPatient.id)}
          onScheduleAppointment={handleScheduleAppointment}
        />

        <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
          <DialogContent className="max-w-2xl">
            <AppointmentScheduler
              patientId={selectedPatient.id}
              patientName={selectedPatient.name}
              onClose={() => setShowScheduler(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-2">Search for existing patients or create new patient profiles</p>
        </div>
      </div>

      <div className="py-8">
        <PatientSearch
          onPatientSelect={handlePatientSelect}
          onCreateNewPatient={handleCreateNewPatient}
        />
      </div>

      <Dialog open={showCreatePatient} onOpenChange={setShowCreatePatient}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Patient</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-center text-gray-500">
              Patient creation form would be implemented here with auto-generated 10-digit ID
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
