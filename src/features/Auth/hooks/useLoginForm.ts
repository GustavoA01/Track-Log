import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  loginFormDefaultValues,
  loginFormSchema,
  type LoginFormValuesType,
} from "@/data/schemas/login-form";
import {
  getFirebaseAuthErrorMessage,
  loginWithEmail,
} from "@/services/firebase/email-auth";

export const useLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<LoginFormValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const onSubmit = async (values: LoginFormValuesType) => {
    setIsSubmitting(true);

    try {
      await loginWithEmail(values);
      toast.success("Login realizado!");
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/");
      router.refresh();
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    methods,
    onSubmit,
    isSubmitting,
  };
};
