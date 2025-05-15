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
      className={`shadow-lg flex flex-col bg-card/80 backdrop-blur-sm border-transparent rounded-lg overflow-hidden futuristic-tilted-box-metrics ${className}`}
      // Removed clipPath style
    >
      <div className="futuristic-text-straightener p-2"> {/* Added padding to this wrapper to help with content visibility */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-6 md:px-8"> {/* Adjusted padding */}
          <CardTitle className="text-base font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
          <div className="text-primary animate-pulse-scale-glow">{icon}</div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center p-4 pt-0 px-6 md:px-8 text-center"> {/* Adjusted padding & text-center */}
          <div className="text-5xl font-bold text-foreground">
            {value}
            {unit && <span className="text-3xl text-muted-foreground ml-1.5">{unit}</span>}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}