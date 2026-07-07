"use client";
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

  const handleClick = () => {
    if (href) router.push(href);
    else router.back();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        buttonClassName,
      )}
      onClick={handleClick}
    >
      <ArrowLeft data-icon="inline-start" />
      <p className="max-sm:hidden">Voltar</p>
    </Button>
  );
};
