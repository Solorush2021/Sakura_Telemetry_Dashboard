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
      style={{ clipPath: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)' }}
    >
      {/* Removed top accent line, neon-outline provides border effect */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-10"> {/* Increased padding */}
        <CardTitle className="text-base font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="text-primary animate-pulse-scale-glow">{icon}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center p-4 pt-0 px-10"> {/* Increased padding */}
        <div className="text-5xl font-bold text-foreground">
          {value}
          {unit && <span className="text-3xl text-muted-foreground ml-1.5">{unit}</span>}
        </div>
      </CardContent>
      {/* Removed bottom accent line */}
    </Card>
  );
}
