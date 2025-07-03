
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  role: UserRole;
  onBack: () => void;
}

const roleLabels = {
  doctor: 'Doctor',
  patient: 'Patient',
  'medical-shop': 'Medical Shop'
};

export const LoginForm: React.FC<LoginFormProps> = ({ role, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${roleLabels[role]}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-fit -ml-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Role Selection
          </Button>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {roleLabels[role]} Login
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sign in to access your dashboard
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={`${role}@demo.com`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
            <p className="text-sm text-blue-600">Email: {role}@demo.com</p>
            <p className="text-sm text-blue-600">Password: Any password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
