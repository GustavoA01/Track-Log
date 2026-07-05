"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { bottomNavigationLinks } from "@/data/constants";

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 sm:flex">
      {bottomNavigationLinks.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                size: "sm",
              }),
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
