
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { MedicalShop } from '@/types';
import { ShoppingBag, FileText, Users, Clock } from 'lucide-react';

export const MedicalShopDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const shop = user?.profile as MedicalShop;

  const stats = [
    { title: 'Prescriptions Filled', value: '156', icon: ShoppingBag, color: 'text-purple-600' },
    { title: 'Pending Orders', value: '23', icon: Clock, color: 'text-orange-600' },
    { title: 'Registered Patients', value: '892', icon: Users, color: 'text-blue-600' },
    { title: 'Monthly Revenue', value: '$12.5K', icon: FileText, color: 'text-green-600' },
  ];

  const recentOrders = [
    { id: 1, patient: 'John Smith', medications: 'Amoxicillin, Ibuprofen', date: '2024-01-20', status: 'Ready' },
    { id: 2, patient: 'Mary Johnson', medications: 'Metformin, Lisinopril', date: '2024-01-20', status: 'Processing' },
    { id: 3, patient: 'Robert Brown', medications: 'Aspirin, Vitamin D', date: '2024-01-19', status: 'Completed' },
  ];

  const lowStockItems = [
    { name: 'Amoxicillin 500mg', current: 25, minimum: 50 },
    { name: 'Insulin Pen', current: 8, minimum: 20 },
    { name: 'Blood Pressure Monitor', current: 3, minimum: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={shop?.avatar}
                  alt={shop?.name}
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{shop?.name}</h1>
                <p className="text-sm text-gray-600">Owner: {shop?.ownerName} • License: {shop?.licenseNumber}</p>
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
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{order.patient}</p>
                      <p className="text-sm text-gray-600">{order.medications}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Ready' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <p className="font-medium text-red-900 text-sm">{item.name}</p>
                      <p className="text-xs text-red-600">
                        Current: {item.current} | Min: {item.minimum}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Reorder Stock
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Process Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Inventory Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Customer Database
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
