import Link from "next/link";
import { AuthLayout } from "@/features/Auth/components/AuthLayout";
import { ForgotPasswordForm } from "@/features/Auth/container/ForgotPasswordForm";

const ForgotPasswordPage = () => (
  <AuthLayout
    title="Esqueci a senha"
    description="Informe seu e-mail para receber um link de redefinição."
    footer={
      <>
        Lembrou a senha?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Voltar ao login
        </Link>
      </>
    }
  >
    <ForgotPasswordForm />
  </AuthLayout>
);

export default ForgotPasswordPage;
