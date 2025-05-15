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
}

// Chart config now uses --chart-1 (red) for fuel
const chartConfig = {
  fuel: {
    label: "Fuel %",
    color: "hsl(var(--chart-1))", 
  },
} satisfies ChartConfig;

export function FuelTrendChart() {
  const generateFuelData = (): FuelDataPoint[] => {
    const data: FuelDataPoint[] = [];
    let currentFuel = 80 + Math.random() * 10; 
    for (let i = 0; i < 12; i++) { 
      data.push({ time: `T-${11 - i}min`, fuel: parseFloat(currentFuel.toFixed(1)) });
      currentFuel -= (Math.random() * 2 + 0.5); 
      currentFuel = Math.max(20, currentFuel); 
    }
    return data;
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
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" /> {/* Lighter grid */}
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 6)} 
          stroke="hsl(var(--muted-foreground))"
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
          <div className="flex justify-center mt-4">
            {payload?.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center mr-4">
                <span style={{ backgroundColor: entry.color, width: '12px', height: '12px', display: 'inline-block', marginRight: '4px', borderRadius: '2px' }}></span>
                <span style={{ color: 'hsl(var(--foreground))' }}>{entry.value}</span>
              </div>
            ))}
          </div>
        )} />
        <Line
          dataKey="fuel"
          type="monotone"
          stroke="var(--color-fuel)" // This will now use hsl(var(--chart-1)) which is red
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
        />
      </LineChart>
    </ChartContainer>
  );
}
