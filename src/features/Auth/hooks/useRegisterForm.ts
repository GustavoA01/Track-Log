import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  registerFormDefaultValues,
  registerFormSchema,
  type RegisterFormValuesType,
} from "@/data/schemas/register-form";
import {
  getFirebaseAuthErrorMessage,
  registerWithEmail,
} from "@/services/firebase/email-auth";

export const useRegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<RegisterFormValuesType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerFormDefaultValues,
  });

  const onSubmit = async (values: RegisterFormValuesType) => {
    setIsSubmitting(true);

    try {
      await registerWithEmail(values);
      toast.success("Conta criada!");
      router.push("/");
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
