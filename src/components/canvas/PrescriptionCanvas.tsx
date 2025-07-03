
import React from 'react';
import { DigitalCanvas } from './DigitalCanvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const PrescriptionCanvas: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Digital Prescription Canvas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DigitalCanvas 
          width={800} 
          height={500}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};
