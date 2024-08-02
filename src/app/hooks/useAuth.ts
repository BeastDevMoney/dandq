"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  interactedToday: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    interactedToday: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/check-auth', {
          credentials: 'include' // Important for including cookies
        });
        if (res.ok) {
          const data = await res.json();
          setAuthState({
            isAuthenticated: data.authenticated,
            username: data.username,
            interactedToday: data.interactedToday
          });
          if (!data.authenticated) {
            router.replace('/login');
          }
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  return { ...authState, isLoading };
}