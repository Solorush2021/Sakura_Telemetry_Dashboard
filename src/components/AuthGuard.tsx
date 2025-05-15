// src/components/AuthGuard.tsx
"use client";

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated as checkAuth } from '@/lib/auth'; // Renamed to avoid conflict
import { Skeleton } from '@/components/ui/skeleton';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps): ReactNode {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const authenticated = checkAuth();
    if (!authenticated) {
      router.replace('/auth/login');
    } else {
      setIsVerified(true);
    }
  }, [router]);

  if (!isVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    );
  }

  return children;
}
