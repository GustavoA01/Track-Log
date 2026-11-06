"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { tabsNavigation } from "@/data/constants";

export const BottomNav = () => {
  const pathname = usePathname();
  const authPaths = ["/login", "/cadastrar", "/esqueci-senha"];

  const verifyPath = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const isAuthRoute = authPaths.some(verifyPath);

  if (isAuthRoute) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur-sm sm:hidden">
      <div className="mx-auto flex h-16 max-w-6xl">
        {tabsNavigation.map(({ href, label, icon: Icon }) => {
          const isActive = verifyPath(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-all",
                isActive && "text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
