
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, User } from 'lucide-react';
import { Patient } from '@/types';

interface PatientSearchProps {
  onPatientSelect: (patient: Patient) => void;
  onCreateNewPatient: () => void;
}

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: '1234567890',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phoneNumber: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    address: '123 Main St, Springfield, IL 62701',
    emergencyContact: '+1 (555) 987-6543',
    insuranceId: 'INS123456',
    status: 'discharged'
  },
  {
    id: '0987654321',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phoneNumber: '+1 (555) 456-7890',
    dateOfBirth: '1992-03-22',
    gender: 'female',
    address: '456 Oak Ave, Springfield, IL 62702',
    emergencyContact: '+1 (555) 234-5678',
    insuranceId: 'INS789012',
    status: 'admitted'
  },
  {
    id: '1122334455',
    name: 'Michael Chen',
    email: 'mike.chen@email.com',
    phoneNumber: '+1 (555) 789-0123',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: '789 Pine St, Springfield, IL 62703',
    emergencyContact: '+1 (555) 345-6789',
    status: 'reappointment'
  }
];

export const PatientSearch: React.FC<PatientSearchProps> = ({
  onPatientSelect,
  onCreateNewPatient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockPatients.filter(patient =>
        patient.id.includes(searchTerm) ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'admitted': return 'bg-red-100 text-red-800';
      case 'discharged': return 'bg-green-100 text-green-800';
      case 'partially-admitted': return 'bg-yellow-100 text-yellow-800';
      case 'reappointment': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter Patient ID, Name, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={onCreateNewPatient}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Patient
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onPatientSelect(patient)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>Patient ID: {patient.id}</div>
                        <div>Phone: {patient.phoneNumber}</div>
                        <div>Email: {patient.email}</div>
                        <div>DOB: {patient.dateOfBirth}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchTerm && searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No patients found matching your search criteria.</p>
            <Button className="mt-4" onClick={onCreateNewPatient}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Patient Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
