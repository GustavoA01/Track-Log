import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/useAuthProvider";
import {
  editAccountFormSchema,
  registerFormDefaultValues,
  registerFormSchema,
  type AccountFormValuesType,
} from "@/data/schemas/register-form";
import {
  getFirebaseAuthErrorMessage,
  registerWithEmail,
  updateAccount,
} from "@/services/firebase/email-auth";

type UseRegisterFormOptions = {
  isEdit?: boolean;
};

export const useRegisterForm = ({
  isEdit = false,
}: UseRegisterFormOptions = {}) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<AccountFormValuesType>({
    resolver: (isEdit
      ? zodResolver(editAccountFormSchema)
      : zodResolver(registerFormSchema)) as Resolver<AccountFormValuesType>,
    defaultValues: registerFormDefaultValues,
  });

  useEffect(() => {
    if (!isEdit || isLoading || !user) return;

    methods.reset({
      name: user.displayName ?? "",
      email: user.email ?? "",
      password: "",
      currentPassword: "",
    });
  }, [isEdit, isLoading, methods, user]);

  const onSubmit = async (values: AccountFormValuesType) => {
    setIsSubmitting(true);

    try {
      if (isEdit) {
        const emailChanged = values.email !== (user?.email ?? "");
        const passwordChanged = values.password.length > 0;

        if ((emailChanged || passwordChanged) && !values.currentPassword) {
          methods.setError("currentPassword", {
            message: "Informe a senha atual para alterar e-mail ou senha.",
          });
          return;
        }

        await updateAccount(values);
        toast.success("Dados atualizados!");
      } else {
        await registerWithEmail({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        toast.success("Conta criada!");
      }

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
    isEdit,
    isLoadingUser: isEdit && isLoading,
  };
};
