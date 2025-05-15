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
    <Card className={`shadow-lg flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <div className="text-4xl font-bold text-foreground">
          {value}
          {unit && <span className="text-2xl text-muted-foreground ml-1">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
