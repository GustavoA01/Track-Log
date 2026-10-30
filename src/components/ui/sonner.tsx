"use client";
import {
  CircleCheck,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert,
} from "lucide-react";
import { useTheme } from "@wrksz/themes/client";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "9999px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "left-1/2! w-max! max-w-[min(100vw-2rem,28rem)]! -translate-x-1/2! min-h-0! gap-2! rounded-full! px-3! py-1.5! text-sm!",
          content: "min-w-0!",
          title: "text-sm! font-medium! [overflow-wrap:anywhere]!",
          closeButton:
            "static! inset-auto! order-last! size-5! shrink-0! translate-none! transform-none! rounded-full! border-0! bg-transparent!",
        },
      }}
      {...props}
    />
  );
};
