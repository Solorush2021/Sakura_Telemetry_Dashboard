// src/components/LogoutButton.tsx
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logout as performLogout } from '@/lib/auth';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    performLogout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.replace('/auth/login');
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
