// src/app/dashboard/layout.tsx
import type { ReactNode } from 'react';
import { AuthGuard } from '@/components/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    </AuthGuard>
  );
}
