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
      className={`shadow-lg flex flex-col bg-card/90 backdrop-blur-sm border border-primary/30 rounded-lg overflow-hidden hover:border-primary/60 transition-colors duration-300 ${className}`}
      style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
    >
      <div className="h-1.5 bg-primary/70 w-full"></div> {/* Top accent line */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-8"> {/* Increased horizontal padding */}
        <CardTitle className="text-base font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="text-accent">{icon}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center p-4 pt-0 px-8"> {/* Increased horizontal padding */}
        <div className="text-5xl font-bold text-foreground">
          {value}
          {unit && <span className="text-3xl text-muted-foreground ml-1.5">{unit}</span>}
        </div>
      </CardContent>
      <div className="h-0.5 bg-primary/40 w-3/4 mx-auto"></div> {/* Bottom accent line */}
    </Card>
  );
}
