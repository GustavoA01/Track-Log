"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AuthLoading } from "../../../components/skeletons/AuthLoading";
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

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <RegisterFormFields isEdit={isEdit} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? isEdit
              ? "Salvando..."
              : "Criando conta..."
            : isEdit
              ? "Salvar alterações"
              : "Criar conta"}
        </Button>
      </form>
    </FormProvider>
  );
};
