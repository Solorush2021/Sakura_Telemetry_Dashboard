// src/components/dashboard/DataDisplayCard.tsx
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DataDisplayCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  className?: string;
};

export function DataDisplayCard({ title, value, unit, icon, className }: DataDisplayCardProps) {
  return (
    <Card 
      className={`shadow-lg flex flex-col bg-card/80 backdrop-blur-sm border-transparent rounded-lg overflow-hidden neon-outline-primary ${className}`}
      style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }} // Reduced tilt
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-10 md:px-12">
        <CardTitle className="text-base font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="text-primary animate-pulse-scale-glow">{icon}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center p-6 pt-0 px-10 md:px-12 text-center">
        <div className="text-5xl font-bold text-foreground">
          {value}
          {unit && <span className="text-3xl text-muted-foreground ml-1.5">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
