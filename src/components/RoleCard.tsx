
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Users, User, ShoppingBag } from 'lucide-react';

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  onClick: () => void;
}

const roleIcons = {
  doctor: Users,
  patient: User,
  'medical-shop': ShoppingBag
};

const roleColors = {
  doctor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  patient: 'bg-green-50 border-green-200 hover:bg-green-100',
  'medical-shop': 'bg-purple-50 border-purple-200 hover:bg-purple-100'
};

export const RoleCard: React.FC<RoleCardProps> = ({ role, title, description, onClick }) => {
  const Icon = roleIcons[role];
  
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${roleColors[role]}`}
      onClick={onClick}
    >
      <CardContent className="p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-white p-4 shadow-md">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};
