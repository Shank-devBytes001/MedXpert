
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Patient } from '@/types';
import { FileText, Calendar, User, Hospital } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const patient = user?.profile as Patient;

  const myReports = [
    { id: 1, title: 'Blood Test Results', doctor: 'Dr. Sarah Johnson', date: '2024-01-20', type: 'Lab Report' },
    { id: 2, title: 'Chest X-Ray', doctor: 'Dr. Michael Chen', date: '2024-01-15', type: 'Imaging' },
    { id: 3, title: 'Discharge Summary', doctor: 'Dr. Sarah Johnson', date: '2024-01-10', type: 'Discharge' },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-01-25', time: '10:00 AM', type: 'Follow-up' },
    { id: 2, doctor: 'Dr. Robert Kim', date: '2024-01-30', time: '2:30 PM', type: 'Consultation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={patient?.avatar}
                  alt={patient?.name}
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome, {patient?.name}</h1>
                <p className="text-sm text-gray-600">Patient ID: {patient?.id}</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doctors</p>
                  <p className="text-3xl font-bold text-gray-900">4</p>
                </div>
                <User className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hospitals</p>
                  <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
                <Hospital className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">My Medical Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-600">by {report.doctor}</p>
                      <p className="text-xs text-gray-500">{report.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {report.type}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                View All Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                    <p className="text-sm text-blue-600">{appointment.date} at {appointment.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
