"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
  href?: string;
};

export const BackButton = ({ className, href }: BackButtonProps) => {
  const router = useRouter();
  const buttonClassName = cn(
    "max-sm:border max-sm:rounded-full max-sm:p-2 max-sm:border-border",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          buttonClassName,
        )}
      >
        <ArrowLeft data-icon="inline-start" />
        <p className="max-sm:hidden">Voltar</p>
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={buttonClassName}
      onClick={() => router.back()}
    >
      <ArrowLeft data-icon="inline-start" />
      <p className="max-sm:hidden">Voltar</p>
    </Button>
  );
};
