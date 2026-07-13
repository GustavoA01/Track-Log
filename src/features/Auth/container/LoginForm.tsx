"use client";

import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoginFormFields } from "../components/LoginFormFields";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
  const { methods, onSubmit, isSubmitting } = useLoginForm();

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <LoginFormFields />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </FormProvider>
  );
};
