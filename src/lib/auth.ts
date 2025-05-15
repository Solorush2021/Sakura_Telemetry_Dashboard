// src/lib/auth.ts
"use client"; // Ensure this runs only on the client where localStorage is available

const JWT_KEY = 'sakura_telemetry_jwt_token';

export const login = (token: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(JWT_KEY, token);
    } catch (error) {
      console.error("Failed to set JWT token in localStorage", error);
    }
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(JWT_KEY);
    } catch (error) {
      console.error("Failed to remove JWT token from localStorage", error);
    }
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(JWT_KEY);
    } catch (error) {
      console.error("Failed to get JWT token from localStorage", error);
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!getToken();
  }
  return false; // Default to false if window is not defined (server-side)
};
