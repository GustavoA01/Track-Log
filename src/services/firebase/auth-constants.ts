export const AUTH_COOKIE_NAME = "firebase-auth-token";
export const AUTH_PUBLIC_PATHS = [
  "/",
  "/login",
  "/cadastrar",
  "/esqueci-senha",
] as const;

export const AUTH_GUEST_ONLY_PATHS = ["/login", "/esqueci-senha"] as const;

const matchesPath = (pathname: string, path: string) =>
  pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

export const isAuthPublicPath = (pathname: string) =>
  AUTH_PUBLIC_PATHS.some((path) => matchesPath(pathname, path));

export const isAuthGuestOnlyPath = (pathname: string) =>
  AUTH_GUEST_ONLY_PATHS.some((path) => matchesPath(pathname, path));

export const authErrorMessages = {
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/weak-password": "A senha é muito fraca.",
  "auth/requires-recent-login": "Informe sua senha atual para continuar.",
  "auth/too-many-requests":
    "Muitas tentativas. Aguarde um momento e tente novamente.",
};
