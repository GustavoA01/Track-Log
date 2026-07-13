import { Mail } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import type { ForgotPasswordFormValuesType } from "@/data/schemas/forgot-password-form";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";

export const ForgotPasswordFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ForgotPasswordFormValuesType>();

  return (
    <div className="space-y-2">
      <FormFieldLabel htmlFor="forgot-password-email" icon={Mail}>
        E-mail
      </FormFieldLabel>
      <Input
        id="forgot-password-email"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        aria-invalid={!!errors.email}
        {...register("email")}
      />
      <FieldError message={errors.email?.message} />
    </div>
  );
};
