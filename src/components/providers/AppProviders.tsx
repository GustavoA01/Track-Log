"use client";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/useAuthProvider";
import { QueryProvider } from "./QueryProvider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => (
  <QueryProvider>
    <AuthProvider>
      {children}
      <Toaster position="top-right" />
    </AuthProvider>
  </QueryProvider>
);
