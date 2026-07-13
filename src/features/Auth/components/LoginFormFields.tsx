import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import type { LoginFormValuesType } from "@/data/schemas/login-form";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";

export const LoginFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValuesType>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormFieldLabel htmlFor="login-email" icon={Mail}>
          E-mail
        </FormFieldLabel>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <FormFieldLabel htmlFor="login-password" icon={Lock}>
            Senha
          </FormFieldLabel>
          <Link
            href="/esqueci-senha"
            className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Esqueci a senha
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        <FieldError message={errors.password?.message} />
      </div>
    </div>
  );
};
