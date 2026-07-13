import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/services/firebase/auth-constants";
import { verifyFirebaseIdToken } from "@/services/firebase/verify-id-token";

type SessionResult =
  | { ok: true; userId: string }
  | { ok: false; reason: "missing" | "invalid" };

const resolveSessionUserId = async (): Promise<SessionResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return { ok: false, reason: "missing" };

  try {
    return { ok: true, userId: await verifyFirebaseIdToken(token) };
  } catch {
    return { ok: false, reason: "invalid" };
  }
};

export const getOptionalCurrentUserId = async () => {
  const session = await resolveSessionUserId();
  return session.ok ? session.userId : null;
};

export const getCurrentUserId = async () => {
  const session = await resolveSessionUserId();

  if (session.ok) return session.userId;

  if (session.reason === "missing") throw new Error("Não autenticado");

  throw new Error("Sessão inválida ou expirada. Faça login novamente.");
};
