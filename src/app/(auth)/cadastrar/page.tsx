import Link from "next/link";
import { AuthGuard } from "@/features/Auth/container/AuthGuard";
import { AuthLayout } from "@/features/Auth/components/AuthLayout";
import { RegisterForm } from "@/features/Auth/container/RegisterForm";

type CadastrarPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

const CadastrarPage = async ({ searchParams }: CadastrarPageProps) => {
  const { edit } = await searchParams;
  const isEdit = edit === "true";
  const description = isEdit
    ? "Atualize seu nome, e-mail ou senha."
    : "Comece a acompanhar suas sessões de estudo.";

  return (
    <AuthGuard mode={isEdit ? "protected" : "guest"}>
      <AuthLayout
        title={isEdit ? "Alterar dados" : "Criar conta"}
        description={description}
        footer={
          isEdit ? (
            <>
              <Link
                href="/"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Voltar ao início
              </Link>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Entrar
              </Link>
            </>
          )
        }
      >
        <RegisterForm isEdit={isEdit} />
      </AuthLayout>
    </AuthGuard>
  );
};

export default CadastrarPage;
