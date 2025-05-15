// src/components/dashboard/AiSuggestionsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Route, TrendingUp } from 'lucide-react';

type AiSuggestionsCardProps = {
  currentFuel: number;
  className?: string;
};

export function AiSuggestionsCard({ currentFuel, className }: AiSuggestionsCardProps) {
  const estimatedRange = Math.round(currentFuel * 4.5); // Mock calculation: 1% fuel = 4.5km

  const fuelEfficiencyTips = [
    "Maintain RPM between 2000-2500 for optimal efficiency.",
    "Reduce prolonged idling; turn off engine if stopped for >1 min.",
    "Ensure tires are properly inflated to reduce rolling resistance.",
    "Avoid rapid acceleration and hard braking for smoother fuel usage.",
  ];

  return (
    <Card
      className={`shadow-lg flex flex-col bg-card/80 backdrop-blur-sm border-transparent rounded-lg overflow-hidden neon-outline-primary ${className}`}
      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-4 pl-16 pr-6 md:pl-20 md:pr-8">
        <CardTitle className="text-lg font-semibold text-primary uppercase tracking-wider">AI Diagnostics & Projections</CardTitle>
        <TrendingUp size={28} className="text-primary animate-pulse-scale-glow" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-6 pt-2 pl-16 pr-6 md:pl-20 md:pr-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb size={20} className="text-accent" />
            <h3 className="font-semibold text-muted-foreground tracking-wide">Fuel Efficiency Tips:</h3>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-foreground/90 pl-2 text-base">
            {fuelEfficiencyTips.slice(0, 3).map((tip, index) => ( 
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Route size={20} className="text-accent" />
            <h3 className="font-semibold text-muted-foreground tracking-wide">Estimated Range:</h3>
          </div>
          <p className="text-3xl font-bold text-accent animate-text-shimmer">
            {estimatedRange} km
          </p>
          <p className="text-xs text-muted-foreground/70">(Based on current fuel and optimal conditions)</p>
        </div>
      </CardContent>
    </Card>
  );
}
