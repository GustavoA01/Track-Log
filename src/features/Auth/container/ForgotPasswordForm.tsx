"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ConfirmResetEmailDialog } from "../components/ConfirmResetEmailDialog";
import { ForgotPasswordFormFields } from "../components/ForgotPasswordFormFields";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export const ForgotPasswordForm = () => {
  const {
    methods,
    onSubmit,
    onConfirmSend,
    isSubmitting,
    isConfirmOpen,
    setIsConfirmOpen,
    pendingEmail,
  } = useForgotPasswordForm();

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-6"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <ForgotPasswordFormFields />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Continuar
          </Button>
        </form>
      </FormProvider>

      <ConfirmResetEmailDialog
        open={isConfirmOpen}
        email={pendingEmail}
        isPending={isSubmitting}
        onOpenChange={setIsConfirmOpen}
        onConfirm={onConfirmSend}
      />
    </>
  );
};
