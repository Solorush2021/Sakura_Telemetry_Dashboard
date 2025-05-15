
// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataDisplayCard } from '@/components/dashboard/DataDisplayCard';
import { FuelTrendChart } from '@/components/dashboard/FuelTrendChart';
import { TextRibbon } from '@/components/dashboard/TextRibbon';
import { AiSuggestionsCard } from '@/components/dashboard/AiSuggestionsCard';
import { CherryBlossomIcon } from '@/components/icons/CherryBlossomIcon';
import { LogoutButton } from '@/components/LogoutButton';
import { Fuel, Activity, SignalHigh, BarChartHorizontalBig, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const [fuel, setFuel] = useState(75.0);
  const [rpm, setRpm] = useState(3000);
  const [gnssAccuracy, setGnssAccuracy] = useState(95.0);
  const [showFuelTrend, setShowFuelTrend] = useState(false);
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    const updateSystemTime = () => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + " UTC");
    };
    updateSystemTime();
    const timeInterval = setInterval(updateSystemTime, 1000);

    const dataInterval = setInterval(() => {
      setFuel(prev => parseFloat(Math.max(0, Math.min(100, prev + (Math.random() * 4 - 2))).toFixed(1)));
      setRpm(prev => Math.max(0, Math.min(8000, prev + Math.floor(Math.random() * 400 - 200))));
      setGnssAccuracy(prev => parseFloat(Math.max(0, Math.min(100, prev + (Math.random() * 2 - 1))).toFixed(1)));
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-2 md:p-4">
      <div className="relative container mx-auto border border-primary/20 rounded-lg p-4 md:p-6 shadow-2xl bg-background/80 backdrop-blur-sm space-y-6">
        <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-primary/70 rounded-tl-lg opacity-90"></div>
        <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-primary/70 rounded-tr-lg opacity-90"></div>
        <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-primary/70 rounded-bl-lg opacity-90"></div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-primary/70 rounded-br-lg opacity-90"></div>
        
        <header className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 pb-4 border-b-2 border-primary/30">
          <div className="flex items-center space-x-4">
            <CherryBlossomIcon className="h-12 w-12 text-primary animate-pulse neon-glow" />
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight animate-title-glow">SAKURA TELEMETRY</h1>
              <p className="text-sm text-primary/80 uppercase tracking-wider">Operational Dashboard // v2.1</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <LogoutButton />
            <p className="text-xs text-muted-foreground font-mono">{systemTime}</p>
          </div>
        </header>

        <TextRibbon />

        <div className="grid grid-cols-2 gap-2 md:gap-4 text-sm text-accent/70 uppercase tracking-wider mb-2 mt-4">
          <p>System Status: <span className="text-green-400">OPERATIONAL</span></p>
          <p className="text-right">Data Stream: <span className="text-green-400">ACTIVE</span></p>
        </div>

        <section 
          className="p-4 bg-card/50 border border-transparent rounded-md shadow-inner neon-outline-primary" 
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          <h2 className="text-xl font-semibold text-primary text-center mb-4 uppercase tracking-widest px-24 py-2 animate-text-shimmer"> // Core Metrics Array</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-6">
            <DataDisplayCard
              title="Fuel Reserves"
              value={fuel}
              unit="%"
              icon={<Fuel size={32} />} 
            />
            <DataDisplayCard
              title="Engine Output"
              value={rpm.toLocaleString()}
              unit="RPM"
              icon={<Activity size={32} />} 
            />
            <DataDisplayCard
              title="GNSS Precision"
              value={gnssAccuracy}
              unit="%"
              icon={<SignalHigh size={32} />} 
            />
          </div>
        </section>
        
        <Separator className="my-6 bg-primary/40 h-[1px]" />

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div 
            className="lg:col-span-2 flex flex-col p-4 bg-card/50 border border-transparent rounded-md shadow-inner neon-outline-primary flex-grow justify-center" 
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          >
            <h2 className="text-xl font-semibold text-primary text-center mb-4 uppercase tracking-widest px-24 py-2 animate-text-shimmer"> // Fuel Consumption Analysis</h2>
            <div className="flex justify-center px-6">
              <Button 
                onClick={() => setShowFuelTrend(!showFuelTrend)}
                size="lg"
                variant="outline"
                className="text-base px-10 py-6 border-2 border-primary hover:border-primary active:border-primary text-primary hover:text-primary-foreground active:text-primary-foreground tracking-wider rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_hsl(var(--primary)),0_0_25px_hsl(var(--primary)/0.8)] active:scale-100"
              >
                <BarChartHorizontalBig className="mr-3 h-6 w-6" />
                {showFuelTrend ? 'Close Fuel Analysis' : 'Initiate Fuel Trend Plot'}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <AiSuggestionsCard currentFuel={fuel} className="flex-grow" />
          </div>
        </section>
        
        {showFuelTrend && (
          <Card 
            className="mt-6 shadow-xl bg-card/80 backdrop-blur-sm border-transparent rounded-lg neon-outline-chart4"
          >
            <CardHeader className="border-b border-primary/30 px-10 py-4">
              <CardTitle className="text-2xl text-center text-primary tracking-wide">Sakura Fuel Trends</CardTitle>
              <CardDescription className="text-center text-muted-foreground/80">
                Real-time & projected fuel consumption over temporal segments.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-6 md:px-10">
              <FuelTrendChart />
            </CardContent>
          </Card>
        )}
        
        <Separator className="my-6 bg-primary/40 h-[1px]" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground p-2">
            <div className="flex items-center space-x-2">
                <AlertTriangle size={16} className="text-yellow-500 animate-pulse"/>
                <span>Simulated data stream for demonstration purposes. Anomaly detection inactive.</span>
            </div>
            <p className="md:text-right">Last telemetry sync: {systemTime.slice(0,8)}</p>
        </div>

        <footer className="text-center pt-6 pb-2 text-muted-foreground text-sm border-t border-primary/20">
          <p>&copy; {new Date().getFullYear()} Sakura Telemetry Systems Ltd. // Secure Connection Established</p>
          <p className="font-mono opacity-70 text-xs">STS_DASH_REL_2.1.0 // All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
