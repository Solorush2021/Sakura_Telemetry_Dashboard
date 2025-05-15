// src/components/dashboard/FuelTrendChart.tsx
"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"; 

interface FuelDataPoint {
  time: string;
  fuel: number;
  estimatedFuel?: number;
}

const chartConfig = {
  fuel: {
    label: "Fuel %",
    color: "hsl(var(--chart-1))", 
  },
  estimatedFuel: {
    label: "Est. Fuel %",
    color: "hsl(var(--chart-5))", // Bright Yellow
  },
} satisfies ChartConfig;

export function FuelTrendChart() {
  const generateFuelData = (): FuelDataPoint[] => {
    const data: FuelDataPoint[] = [];
    let currentFuel = 80 + Math.random() * 10; 
    const consumptionRate = 2 + Math.random(); // Base consumption rate
    const estConsumptionRate = consumptionRate * 0.75; // Estimated is more efficient

    // Historical and current data
    for (let i = 0; i < 12; i++) { 
      data.push({ time: `T-${11 - i}min`, fuel: parseFloat(currentFuel.toFixed(1)) });
      currentFuel -= (Math.random() * 0.5 + consumptionRate - 0.25); 
      currentFuel = Math.max(20, currentFuel); 
    }

    // Future estimated data
    let lastActualFuel = data[data.length - 1].fuel;
    for (let i = 1; i <= 6; i++) { // Project 6 steps into the future
      const estimatedPoint = parseFloat(Math.max(0, lastActualFuel - (estConsumptionRate * i)).toFixed(1));
      // Add to existing points if they exist, or create new ones
      if (data[11 + i]) {
        data[11+i].estimatedFuel = estimatedPoint;
        data[11+i].time = `T+${i}min`; // Ensure time labels extend
      } else {
         // This case is if we want to extend X-axis further than historical data.
         // For now, we'll overlay on the same time axis if possible, or adjust X-axis data structure.
         // Let's assume we extend the time axis.
         // For simplicity, we'll make the time axis longer.
         // The example generates 12 past points. Let's add future points directly to the array.
      }
    }
    
    // Simplified: add future points directly extending from the last actual data point
    // This requires the X-axis to accommodate these new 'time' labels.
    // Let's create a base array of 18 points (12 past, 6 future)
    const chartPoints: FuelDataPoint[] = [];
    let fuelLevel = 80 + Math.random() * 10;
    for (let i = 0; i < 12; i++) { // Past 12 minutes
        chartPoints.push({ time: `T-${11-i}m`, fuel: parseFloat(fuelLevel.toFixed(1)) });
        fuelLevel -= (Math.random() * 0.5 + consumptionRate - 0.25);
        fuelLevel = Math.max(5, fuelLevel); // Ensure fuel doesn't go too low for past data
    }

    let lastKnownFuel = chartPoints[11].fuel;
    chartPoints[11].estimatedFuel = lastKnownFuel; // Estimation starts from last known point

    for (let i = 1; i <= 6; i++) { // Next 6 minutes (estimated)
        const estimatedFuelValue = parseFloat(Math.max(0, lastKnownFuel - (estConsumptionRate * i)).toFixed(1));
        chartPoints.push({ time: `T+${i}m`, fuel: NaN, estimatedFuel: estimatedFuelValue }); // fuel is NaN for future points
    }
    return chartPoints;
  };
  
  const chartData = generateFuelData();

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          stroke="hsl(var(--muted-foreground))"
          interval={2} // Show fewer ticks if too crowded
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          stroke="hsl(var(--muted-foreground))"
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent 
            indicator="line" 
            labelClassName="text-sm text-foreground"
            className="bg-popover/80 backdrop-blur-sm border-primary/50" 
          />}
        />
        <Legend content={({ payload }) => (
          <div className="flex justify-center mt-4 space-x-4">
            {payload?.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center">
                <span style={{ backgroundColor: entry.color, width: '12px', height: '12px', display: 'inline-block', marginRight: '4px', borderRadius: '2px' }}></span>
                <span style={{ color: 'hsl(var(--foreground))' }}>{entry.value}</span>
              </div>
            ))}
          </div>
        )} />
        <Line
          dataKey="fuel"
          type="monotone"
          stroke="var(--color-fuel)" 
          strokeWidth={3}
          dot={{
            fill: "var(--color-fuel)",
            r: 4,
            strokeWidth: 1,
            stroke: "hsl(var(--background))"
          }}
          activeDot={{
            r: 6,
            fill: "var(--color-fuel)",
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
          }}
          connectNulls={false} // Do not connect if data is NaN
        />
        <Line
          dataKey="estimatedFuel"
          type="monotone"
          stroke="var(--color-estimatedFuel)"
          strokeWidth={2}
          strokeDasharray="5 5" // Dashed line
          dot={{
            fill: "var(--color-estimatedFuel)",
            r: 3,
            strokeWidth: 1,
            stroke: "hsl(var(--background))"
          }}
          activeDot={{
            r: 5,
            fill: "var(--color-estimatedFuel)",
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
          }}
          connectNulls={false} // Do not connect if data is NaN
        />
      </LineChart>
    </ChartContainer>
  );
}
