"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AuthLoading } from "@/features/Home/components/AuthLoading";
import { RegisterFormFields } from "../components/RegisterFormFields";
import { useRegisterForm } from "../hooks/useRegisterForm";

type RegisterFormProps = {
  isEdit?: boolean;
};

export const RegisterForm = ({ isEdit = false }: RegisterFormProps) => {
  const { methods, onSubmit, isSubmitting, isLoadingUser } = useRegisterForm({
    isEdit,
  });

  if (isLoadingUser) return <AuthLoading />;

  const submitLabel = (() => {
    if (isSubmitting) return "Salvando...";
    if (isEdit) return "Salvar alterações";
    return "Criar conta";
  })();

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <RegisterFormFields isEdit={isEdit} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </form>
    </FormProvider>
  );
};
