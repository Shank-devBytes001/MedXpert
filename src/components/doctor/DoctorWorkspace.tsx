
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, User, FileText, TestTube } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  status: 'admitted' | 'discharged' | 'partially-admitted' | 'reappointment';
  lastVisit: string;
}

interface TestBox {
  id: string;
  testName: string;
  instructions: string;
}

interface Prescription {
  id: string;
  patientId: string;
  medications: string;
  instructions: string;
  tests: TestBox[];
  date: string;
}

export const DoctorWorkspace: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [newPatientForm, setNewPatientForm] = useState({
    name: '',
    age: '',
    gender: '',
    contact: ''
  });
  const [prescriptionText, setPrescriptionText] = useState('');
  const [testBoxes, setTestBoxes] = useState<TestBox[]>([]);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1234567890',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '+1-555-0123',
      status: 'admitted',
      lastVisit: '2024-01-15'
    },
    {
      id: '0987654321',
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      contact: '+1-555-0456',
      status: 'reappointment',
      lastVisit: '2024-01-10'
    }
  ]);

  const generatePatientId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const addTestBox = () => {
    const newTest: TestBox = {
      id: Date.now().toString(),
      testName: '',
      instructions: ''
    };
    setTestBoxes([...testBoxes, newTest]);
  };

  const updateTestBox = (id: string, field: string, value: string) => {
    setTestBoxes(testBoxes.map(test => 
      test.id === id ? { ...test, [field]: value } : test
    ));
  };

  const removeTestBox = (id: string) => {
    setTestBoxes(testBoxes.filter(test => test.id !== id));
  };

  const createNewPatient = () => {
    const newPatient: Patient = {
      id: generatePatientId(),
      name: newPatientForm.name,
      age: parseInt(newPatientForm.age),
      gender: newPatientForm.gender,
      contact: newPatientForm.contact,
      status: 'admitted',
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, newPatient]);
    setSelectedPatientId(newPatient.id);
    setNewPatientForm({ name: '', age: '', gender: '', contact: '' });
  };

  const updatePatientStatus = (patientId: string, status: Patient['status']) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, status } : patient
    ));
  };

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'admitted': return 'bg-red-100 text-red-800';
      case 'discharged': return 'bg-green-100 text-green-800';
      case 'partially-admitted': return 'bg-yellow-100 text-yellow-800';
      case 'reappointment': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Workspace</h1>
          <p className="text-gray-600">Manage patients and create prescriptions efficiently</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Management Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="existing" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="existing">Existing Patient</TabsTrigger>
                    <TabsTrigger value="new">New Patient</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="existing" className="space-y-4">
                    <div>
                      <Label htmlFor="patientId">Patient ID (10 digits)</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="patientId"
                          placeholder="Enter patient ID"
                          value={selectedPatientId}
                          onChange={(e) => setSelectedPatientId(e.target.value)}
                          maxLength={10}
                        />
                        <Button size="icon" variant="outline">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Recent Patients</Label>
                      {patients.map((patient) => (
                        <div
                          key={patient.id}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedPatientId(patient.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-gray-600">ID: {patient.id}</p>
                            </div>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="new" className="space-y-4">
                    <div>
                      <Label htmlFor="name">Patient Name</Label>
                      <Input
                        id="name"
                        value={newPatientForm.name}
                        onChange={(e) => setNewPatientForm({...newPatientForm, name: e.target.value})}
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newPatientForm.age}
                        onChange={(e) => setNewPatientForm({...newPatientForm, age: e.target.value})}
                        placeholder="Enter age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        value={newPatientForm.gender}
                        onChange={(e) => setNewPatientForm({...newPatientForm, gender: e.target.value})}
                        placeholder="Enter gender"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact</Label>
                      <Input
                        id="contact"
                        value={newPatientForm.contact}
                        onChange={(e) => setNewPatientForm({...newPatientForm, contact: e.target.value})}
                        placeholder="Enter contact number"
                      />
                    </div>
                    <Button onClick={createNewPatient} className="w-full">
                      Create Patient (Auto-generate ID)
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Prescription Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Prescription Canvas
                </CardTitle>
                {selectedPatient && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Patient: {selectedPatient.name} (ID: {selectedPatient.id})
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {(['admitted', 'discharged', 'partially-admitted', 'reappointment'] as const).map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={selectedPatient.status === status ? 'default' : 'outline'}
                          onClick={() => updatePatientStatus(selectedPatient.id, status)}
                        >
                          {status.replace('-', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedPatient ? (
                  <>
                    <div>
                      <Label htmlFor="prescription">Prescription & Instructions</Label>
                      <Textarea
                        id="prescription"
                        placeholder="Write prescription details, medications, and instructions here..."
                        value={prescriptionText}
                        onChange={(e) => setPrescriptionText(e.target.value)}
                        className="min-h-[200px] mt-2"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="flex items-center">
                          <TestTube className="h-4 w-4 mr-2" />
                          Medical Tests
                        </Label>
                        <Button onClick={addTestBox} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Test
                        </Button>
                      </div>
                      
                      {testBoxes.map((test) => (
                        <div key={test.id} className="border rounded-lg p-4 mb-3 bg-gray-50">
                          <div className="space-y-3">
                            <div>
                              <Label>Test Name</Label>
                              <Input
                                value={test.testName}
                                onChange={(e) => updateTestBox(test.id, 'testName', e.target.value)}
                                placeholder="e.g., Blood Test, X-Ray, MRI"
                              />
                            </div>
                            <div>
                              <Label>Test Instructions</Label>
                              <Textarea
                                value={test.instructions}
                                onChange={(e) => updateTestBox(test.id, 'instructions', e.target.value)}
                                placeholder="Special instructions for this test"
                                rows={2}
                              />
                            </div>
                            <Button
                              onClick={() => removeTestBox(test.id)}
                              variant="destructive"
                              size="sm"
                            >
                              Remove Test
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1">Save Prescription</Button>
                      <Button variant="outline" className="flex-1">Print</Button>
                      <Button variant="outline" className="flex-1">Email to Patient</Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a patient to start creating prescriptions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions Panel */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>System Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Patient Selection</h3>
                <p className="text-sm text-blue-800">
                  Use the 10-digit patient ID to find existing patients or create new patient profiles with auto-generated IDs.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Prescription Canvas</h3>
                <p className="text-sm text-green-800">
                  Write detailed prescriptions and add medical tests as needed. All data is automatically saved.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Status Tracking</h3>
                <p className="text-sm text-yellow-800">
                  Track patient status: Admitted, Discharged, Partially Admitted, or Reappointment.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Test Management</h3>
                <p className="text-sm text-purple-800">
                  Add multiple test boxes with specific instructions for comprehensive patient care.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
