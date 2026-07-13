import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerFormDefaultValues,
  registerFormSchema,
  type RegisterFormValuesType,
} from "@/data/schemas/register-form";

export const useRegisterForm = () => {
  const methods = useForm<RegisterFormValuesType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerFormDefaultValues,
  });

  const onSubmit = (values: RegisterFormValuesType) => {
    console.log("register submit", values);
  };

  return {
    methods,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
  };
};
