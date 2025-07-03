
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface MainNavigationProps {
  onLoginSelect: (role: UserRole) => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ onLoginSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigationLinks = [
    { name: 'About', href: '#about' },
    { name: 'Top Doctors', href: '#doctors' },
    { name: 'Find Near Hospitals', href: '#hospitals' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">MediReport Pro</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Login Button with Hover Dropdown */}
          <div className="relative">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-blue-600 text-white hover:bg-blue-700">
                    Login
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start mb-1"
                        onClick={() => onLoginSelect('doctor')}
                      >
                        Doctor Login
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start mb-1"
                        onClick={() => onLoginSelect('patient')}
                      >
                        Patient Login
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => onLoginSelect('medical-shop')}
                      >
                        Medical Shop Login
                      </Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
