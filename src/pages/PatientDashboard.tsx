import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, Download, Eye, X, Trash2, Loader2, Image } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { getPatientByUHID, getRecordsByUHID, deleteRecord } from '../utils/db';
import type { Patient, Record } from '../utils/db';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    type: 'prescription' | 'image';
    data: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    const loadPatientData = async () => {
      const user = getCurrentUser();
      if (!user || user.role !== 'patient') {
        navigate('/login');
        return;
      }

      try {
        const patientData = await getPatientByUHID(user.uhid);
        if (!patientData) {
          throw new Error('Patient data not found');
        }
        setPatient(patientData);

        const patientRecords = await getRecordsByUHID(user.uhid);
        setRecords(patientRecords);
      } catch (err) {
        setError('Failed to load patient data');
      }
    };

    loadPatientData();
  }, [navigate]);

  const handleDelete = async () => {
    if (deleteConfirm === null) return;

    setIsDeleting(true);
    try {
      await deleteRecord(deleteConfirm);
      setRecords(prev => prev.filter(r => r.id !== deleteConfirm));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete record');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePreview = (record: Record) => {
    setPreviewData({
      title: record.title,
      type: record.type,
      data: record.data
    });
  };

  const handleDownload = (record: Record) => {
    const link = document.createElement('a');
    if (record.type === 'pdf') {
      const binaryData = atob(record.data.split(',')[1]);
      const array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([array], { type: 'application/pdf' });
      link.href = URL.createObjectURL(blob);
      link.download = `${record.title}.pdf`;
    } else {
      link.href = record.data;
      link.download = `${record.title}.${record.data.split(';')[0].split('/')[1]}`;
    }
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 rounded-lg p-4 text-red-700 flex items-center shadow-soft">
            <AlertCircle className="mr-2 text-red-500" size={20} />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="card border-l-4 border-primary-500 p-6">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-secondary-600">Name</p>
              <p className="text-secondary-900 font-medium">{patient.name}</p>
            </div>
            <div>
              <p className="text-secondary-600">UHID</p>
              <p className="text-secondary-900 font-medium">{patient.uhid}</p>
            </div>
            <div>
              <p className="text-secondary-600">Age</p>
              <p className="text-secondary-900 font-medium">{patient.age} years</p>
            </div>
            <div>
              <p className="text-secondary-600">Gender</p>
              <p className="text-secondary-900 font-medium">{patient.gender}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-primary-500 p-6">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Medical Records</h2>
          {records.length === 0 ? (
            <p className="text-secondary-500 text-center py-8">No medical records found</p>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-white border border-secondary-200 rounded-lg hover:shadow-soft-hover transition-all"
                >
                  <div className="flex items-center gap-4">
                    {record.type === 'image' ? (
                      <Image className="text-primary-500" size={24} />
                    ) : (
                      <FileText className="text-primary-500" size={24} />
                    )}
                    <div>
                      <h4 className="text-secondary-900 font-medium">{record.title}</h4>
                      <p className="text-secondary-600">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-secondary-600">
                        Type: {record.type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePreview(record)}
                      className="text-primary-600 hover:text-primary-700 p-2 rounded-full hover:bg-primary-50 transition"
                      title="Preview"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDownload(record)}
                      className="text-primary-600 hover:text-primary-700 p-2 rounded-full hover:bg-primary-50 transition"
                      title="Download"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(record.id!)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {previewData && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-soft animate-fade-in">
              <div className="flex items-center justify-between p-4 border-b border-secondary-200">
                <h3 className="text-xl font-semibold text-primary-700">{previewData.title}</h3>
                <button
                  onClick={() => setPreviewData(null)}
                  className="text-secondary-500 hover:text-primary-600 p-1 rounded-full hover:bg-primary-50 transition"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {previewData.type === 'prescription' ? (
                  <iframe
                    src={previewData.data}
                    className="w-full h-full min-h-[60vh] rounded-lg"
                    title="PDF Preview"
                  />
                ) : (
                  <img
                    src={previewData.data}
                    alt={previewData.title}
                    className="max-w-full h-auto mx-auto rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Confirm Delete</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this record? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;