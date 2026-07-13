"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RegisterFormFields } from "../components/RegisterFormFields";
import { useRegisterForm } from "../hooks/useRegisterForm";

export const RegisterForm = () => {
  const { methods, onSubmit, isSubmitting } = useRegisterForm();

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <RegisterFormFields />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
    </FormProvider>
  );
};
