import {
  getFirebaseAuthErrorMessage,
  logout,
} from "@/services/firebase/email-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
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

  return handleLogout;
};
