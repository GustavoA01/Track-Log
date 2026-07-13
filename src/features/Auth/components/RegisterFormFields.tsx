import { Lock, Mail, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import type { AccountFormValuesType } from "@/data/schemas/register-form";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";

type RegisterFormFieldsProps = {
  isEdit?: boolean;
};

export const RegisterFormFields = ({
  isEdit = false,
}: RegisterFormFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountFormValuesType>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormFieldLabel htmlFor="register-name" icon={User}>
          Nome
        </FormFieldLabel>
        <Input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="register-email" icon={Mail}>
          E-mail
        </FormFieldLabel>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {isEdit && (
        <div className="space-y-2">
          <FormFieldLabel htmlFor="register-current-password" icon={Lock}>
            Senha atual
          </FormFieldLabel>
          <Input
            id="register-current-password"
            type="password"
            autoComplete="current-password"
            placeholder="Necessária para mudar e-mail ou senha"
            aria-invalid={!!errors.currentPassword}
            {...register("currentPassword")}
          />
          <FieldError message={errors.currentPassword?.message} />
        </div>
      )}

      <div className="space-y-2">
        <FormFieldLabel htmlFor="register-password" icon={Lock}>
          {isEdit ? "Nova senha" : "Senha"}
        </FormFieldLabel>
        <Input
          id="register-password"
          type="password"
          autoComplete={isEdit ? "new-password" : "new-password"}
          placeholder={
            isEdit ? "Deixe em branco para manter" : "Mínimo 6 caracteres"
          }
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        <FieldError message={errors.password?.message} />
      </div>
    </div>
  );
};
