import React from 'react';
import { UserPlus, FileText, FolderPlus, History, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ViewType = 'registration' | 'prescription' | 'previous-records' | 'add-record' | 'profile';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { id: 'profile', label: 'Doctor Profile', icon: User },
    { id: 'registration', label: 'Patient Registration', icon: UserPlus },
    { id: 'prescription', label: 'New Prescription', icon: FileText },
    { id: 'previous-records', label: 'Patient Records', icon: History },
    { id: 'add-record', label: 'Add Previous Record', icon: FolderPlus },
  ];

  return (
    <div className="w-64 bg-white text-secondary-900 p-4 border-r border-secondary-200 min-h-screen flex flex-col relative">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary-600">Doctor Dashboard</h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => onViewChange(id as ViewType)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium text-left ${
                  activeView === id 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'hover:bg-primary-50 text-secondary-900'
                }`}
              >
                <Icon size={20} className={activeView === id ? 'text-primary-600' : 'text-secondary-500'} />
                <span>{label}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => window.open('http://172.31.98.224:5001/', '_blank')}
              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium text-left hover:bg-primary-50 text-secondary-900"
            >
              <FolderPlus size={20} className="text-secondary-500" />
              <span>Discharge summary</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-4 w-56">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-secondary-700 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};