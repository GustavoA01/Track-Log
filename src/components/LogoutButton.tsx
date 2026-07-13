"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  getFirebaseAuthErrorMessage,
  logout,
} from "@/services/firebase/email-auth";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Você saiu da conta");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error));
    }
  };

  return (
    <Button
      size="icon"
      type="button"
      variant="ghost"
      aria-label="Sair"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
    </Button>
  );
};
