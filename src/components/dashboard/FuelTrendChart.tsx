// src/components/dashboard/FuelTrendChart.tsx
"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"; // Recharts is used by shadcn/ui/chart

interface FuelDataPoint {
  time: string;
  fuel: number;
}

const chartConfig = {
  fuel: {
    label: "Fuel %",
    color: "hsl(var(--chart-1))", // Use --chart-1 for fuel line (Vibrant Pink/Magenta)
  },
} satisfies ChartConfig;

export function FuelTrendChart() {
  // Simulated fuel trend data
  const generateFuelData = (): FuelDataPoint[] => {
    const data: FuelDataPoint[] = [];
    let currentFuel = 80 + Math.random() * 10; // Start with some variation
    for (let i = 0; i < 12; i++) { // 12 data points for trend
      data.push({ time: `T-${11 - i}min`, fuel: parseFloat(currentFuel.toFixed(1)) });
      currentFuel -= (Math.random() * 2 + 0.5); // Gradual decrease
      currentFuel = Math.max(20, currentFuel); // Ensure fuel doesn't drop too low
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
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 6)} // Shorten time label if needed
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
          content={<ChartTooltipContent indicator="line" />}
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
          stroke="var(--color-fuel)"
          strokeWidth={3}
          dot={{
            fill: "var(--color-fuel)",
            r: 4,
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
