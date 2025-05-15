import type { Metadata } from 'next';
import { Exo_2 } from 'next/font/google'; // Changed from Inter to Exo 2
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Configure Exo 2 font
const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-sans', // Use --font-sans as it's more common with Tailwind
  display: 'swap', // Improve font loading performance
});

export const metadata: Metadata = {
  title: 'Sakura Telemetry Dashboard',
  description: 'Real-time simulated car data dashboard with a futuristic sci-fi interface',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Force dark theme as per design */}
      <body className={`${exo2.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
