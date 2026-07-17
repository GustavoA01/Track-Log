export const syncAuthSession = async (idToken: string | null) => {
  if (!idToken) {
    const response = await fetch("/api/auth/session", { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Não foi possível encerrar a sessão no servidor.");
    }
    return;
  }

  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível sincronizar a sessão no servidor.");
  }
};
