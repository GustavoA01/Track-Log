import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/services/firebase/auth-constants";
import { verifyFirebaseIdToken } from "@/services/firebase/verify-id-token";

export async function POST(request: Request) {
  const body = (await request.json()) as { token?: string };
  const token = body.token?.trim();

  if (!token) {
    return NextResponse.json({ error: "Token ausente" }, { status: 400 });
  }

  try {
    await verifyFirebaseIdToken(token);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const oneHour = 60 * 60;
  const oneDay = oneHour * 24;

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: oneDay * 7,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
