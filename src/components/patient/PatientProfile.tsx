
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Download, FileText, Pill, User, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { Patient, Appointment, MedicalReport, Prescription } from '@/types';

interface PatientProfileProps {
  patient: Patient;
  appointments: Appointment[];
  medicalReports: MedicalReport[];
  prescriptions: Prescription[];
  onScheduleAppointment: () => void;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({
  patient,
  appointments,
  medicalReports,
  prescriptions,
  onScheduleAppointment
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'admitted':
        return 'bg-red-100 text-red-800';
      case 'discharged':
        return 'bg-green-100 text-green-800';
      case 'partially-admitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'reappointment':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sort appointments by date (newest first)
  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Sort medical reports by date created (newest first)
  const sortedReports = [...medicalReports].sort((a, b) => 
    new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  // Sort prescriptions by date issued (newest first)
  const sortedPrescriptions = [...prescriptions].sort((a, b) => 
    new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Patient Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={patient.avatar} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                  <p className="text-gray-600">Patient ID: {patient.id}</p>
                </div>
                <Badge className={getStatusBadgeColor(patient.status)}>
                  {patient.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{patient.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{patient.address}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium">Date of Birth:</span> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                <p><span className="font-medium">Gender:</span> {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</p>
                <p><span className="font-medium">Emergency Contact:</span> {patient.emergencyContact}</p>
                {patient.insuranceId && (
                  <p><span className="font-medium">Insurance ID:</span> {patient.insuranceId}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onScheduleAppointment} className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Create Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              New Prescription
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sortedAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No appointments found</p>
              ) : (
                sortedAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-600">{appointment.department}</p>
                      </div>
                      <Badge className={getAppointmentStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                      <p className="capitalize">{appointment.type.replace('-', ' ')}</p>
                      {appointment.notes && <p className="mt-1">{appointment.notes}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Medical Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Medical Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sortedReports.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No medical reports found</p>
              ) : (
                sortedReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-gray-600">{report.hospitalName}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="capitalize">{report.reportType} Report</p>
                      <p>{new Date(report.dateCreated).toLocaleDateString()}</p>
                      <p className="mt-1">{report.description}</p>
                    </div>
                    <Badge className={report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {report.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sortedPrescriptions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No prescriptions found</p>
              ) : (
                sortedPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium">Dr. {prescription.doctorName}</p>
                        <p className="text-sm text-gray-600">
                          Issued: {new Date(prescription.dateIssued).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Valid Until: {new Date(prescription.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={prescription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {prescription.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="space-y-3">
                      <p className="font-medium">Medications:</p>
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded">
                          <p className="font-medium">{medication.name}</p>
                          <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                            <p><span className="font-medium">Dosage:</span> {medication.dosage}</p>
                            <p><span className="font-medium">Frequency:</span> {medication.frequency}</p>
                            <p><span className="font-medium">Duration:</span> {medication.duration}</p>
                            <p><span className="font-medium">Refills:</span> {prescription.refillsRemaining}</p>
                          </div>
                          {medication.instructions && (
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">Instructions:</span> {medication.instructions}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {prescription.notes && (
                      <div className="mt-3">
                        <p className="font-medium text-sm">Notes:</p>
                        <p className="text-sm text-gray-600">{prescription.notes}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
