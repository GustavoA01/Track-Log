import Link from "next/link";
import { AuthLayout } from "@/features/Auth/components/AuthLayout";
import { LoginForm } from "@/features/Auth/container/LoginForm";

const LoginPage = () => (
  <AuthLayout
    title="Entrar"
    description="Acesse sua conta para continuar estudando."
    footer={
      <>
        Ainda não tem conta?{" "}
        <Link
          href="/cadastrar"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Criar conta
        </Link>
      </>
    }
  >
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
