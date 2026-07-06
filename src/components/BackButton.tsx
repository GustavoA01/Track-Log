"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`max-sm:border max-sm:rounded-full max-sm:p-2 max-sm:border-border ${className}`}
      onClick={() => router.back()}
    >
      <ArrowLeft data-icon="inline-start" />
      <p className="max-sm:hidden">Voltar</p>
    </Button>
  );
};
