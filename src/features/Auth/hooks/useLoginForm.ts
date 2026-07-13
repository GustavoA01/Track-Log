import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  loginFormDefaultValues,
  loginFormSchema,
  type LoginFormValuesType,
} from "@/data/schemas/login-form";

export const useLoginForm = () => {
  const methods = useForm<LoginFormValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const onSubmit = (values: LoginFormValuesType) => {
    console.log("login submit", values);
  };

  return {
    methods,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
  };
};
