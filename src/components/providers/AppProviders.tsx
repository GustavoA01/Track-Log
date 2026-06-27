"use client";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./QueryProvider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => (
  <QueryProvider>
    {children}
    <Toaster position="top-right" />
  </QueryProvider>
);
