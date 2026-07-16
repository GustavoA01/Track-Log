import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useLogout";

export const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button
      size="icon"
      type="button"
      variant="outline"
      aria-label="Sair"
      onClick={handleLogout}
      className="max-sm:rounded-full w-full flex items-center gap-1 text-sm"
    >
      <p>Sair</p>
      <LogOut className="size-4 text-destructive" />
    </Button>
  );
};
