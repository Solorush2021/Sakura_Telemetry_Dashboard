import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a common sleek sans-serif font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Use --font-sans as it's more common with Tailwind
});

export const metadata: Metadata = {
  title: 'Sakura Telemetry Dashboard',
  description: 'Real-time simulated car data dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Force dark theme as per design */}
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
