import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  forgotPasswordFormDefaultValues,
  forgotPasswordFormSchema,
  type ForgotPasswordFormValuesType,
} from "@/data/schemas/forgot-password-form";
import {
  getFirebaseAuthErrorMessage,
  sendPasswordReset,
} from "@/services/firebase/email-auth";

export const useForgotPasswordForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const methods = useForm<ForgotPasswordFormValuesType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: forgotPasswordFormDefaultValues,
  });

  const onSubmit = (values: ForgotPasswordFormValuesType) => {
    setPendingEmail(values.email);
    setIsConfirmOpen(true);
  };

  const onConfirmSend = async () => {
    setIsSubmitting(true);

    try {
      await sendPasswordReset(pendingEmail);
      toast.success(
        "Se existir uma conta com esse e-mail, enviamos o link de redefinição.",
      );
      setIsConfirmOpen(false);
      router.push("/login");
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    methods,
    onSubmit,
    onConfirmSend,
    isSubmitting,
    isConfirmOpen,
    setIsConfirmOpen,
    pendingEmail,
  };
};
