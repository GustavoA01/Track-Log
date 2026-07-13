export const AUTH_COOKIE_NAME = "firebase-auth-token";
export const AUTH_PUBLIC_PATHS = [
  "/",
  "/login",
  "/cadastrar",
  "/esqueci-senha",
] as const;
export const AUTH_GUEST_ONLY_PATHS = [
  "/login",
  "/cadastrar",
  "/esqueci-senha",
] as const;

const matchesPath = (pathname: string, path: string) =>
  pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

export const isAuthPublicPath = (pathname: string) =>
  AUTH_PUBLIC_PATHS.some((path) => matchesPath(pathname, path));

export const isAuthGuestOnlyPath = (pathname: string) =>
  AUTH_GUEST_ONLY_PATHS.some((path) => matchesPath(pathname, path));
