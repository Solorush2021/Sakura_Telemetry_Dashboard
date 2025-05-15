// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataDisplayCard } from '@/components/dashboard/DataDisplayCard';
import { FuelTrendChart } from '@/components/dashboard/FuelTrendChart';
import { CherryBlossomIcon } from '@/components/icons/CherryBlossomIcon';
import { LogoutButton } from '@/components/LogoutButton';
import { Fuel, Gauge, SignalHigh, BarChartHorizontalBig } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const [fuel, setFuel] = useState(75.0);
  const [rpm, setRpm] = useState(3000);
  const [gnssAccuracy, setGnssAccuracy] = useState(95.0);
  const [showFuelTrend, setShowFuelTrend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFuel(prev => parseFloat(Math.max(0, Math.min(100, prev + (Math.random() * 4 - 2))).toFixed(1)));
      setRpm(prev => Math.max(0, Math.min(8000, prev + Math.floor(Math.random() * 400 - 200))));
      setGnssAccuracy(prev => parseFloat(Math.max(0, Math.min(100, prev + (Math.random() * 2 - 1))).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <CherryBlossomIcon className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Sakura Telemetry Dashboard</h1>
        </div>
        <LogoutButton />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataDisplayCard
          title="Fuel Level"
          value={fuel}
          unit="%"
          icon={<Fuel size={28} />}
          className="bg-card"
        />
        <DataDisplayCard
          title="Engine RPM"
          value={rpm.toLocaleString()} // Format RPM with comma
          unit="RPM"
          icon={<Gauge size={28} />}
          className="bg-card"
        />
        <DataDisplayCard
          title="GNSS Accuracy"
          value={gnssAccuracy}
          unit="%"
          icon={<SignalHigh size={28} />}
          className="bg-card"
        />
      </section>
      
      <Separator className="my-8 bg-border/50" />

      <section className="space-y-6">
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowFuelTrend(!showFuelTrend)}
            size="lg"
            className="text-base px-8 py-6"
          >
            <BarChartHorizontalBig className="mr-2 h-5 w-5" />
            {showFuelTrend ? 'Hide Fuel Trend' : 'View Fuel Trend'}
          </Button>
        </div>

        {showFuelTrend && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">Sakura Fuel Trends</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Visualizing simulated fuel consumption over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FuelTrendChart />
            </CardContent>
          </Card>
        )}
      </section>

      <footer className="text-center py-8 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Sakura Telemetry Systems. All rights reserved.</p>
        <p>Simulated data for demonstration purposes.</p>
      </footer>
    </div>
  );
}
