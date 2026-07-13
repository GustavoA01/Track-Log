import Link from "next/link";
import { AuthLayout } from "@/features/Auth/components/AuthLayout";
import { RegisterForm } from "@/features/Auth/container/RegisterForm";

const RegisterPage = () => (
  <AuthLayout
    title="Criar conta"
    description="Comece a acompanhar suas sessões de estudo."
    footer={
      <>
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </>
    }
  >
    <RegisterForm />
  </AuthLayout>
);

export default RegisterPage;
