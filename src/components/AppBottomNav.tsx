"use client";
import { usePathname } from "next/navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const AppBottomNav = () => {
  const pathname = usePathname();
  const authPaths = ["/login", "/cadastrar", "/esqueci-senha"];
  const isAuthRoute = authPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isAuthRoute) return null;

  return <MobileBottomNav />;
};
