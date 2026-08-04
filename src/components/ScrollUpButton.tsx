"use client";
import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      size="icon-lg"
      variant="outline"
      onClick={handleScrollUp}
      aria-label="Voltar ao topo"
      className={cn(
        "fixed right-4 bottom-20 z-40 rounded-full bg-background shadow-md dark:bg-background sm:bottom-4",
        "transition-all duration-200",
        isVisible
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-75 opacity-0",
      )}
    >
      <ChevronUp className="text-muted-foreground" />
    </Button>
  );
};
