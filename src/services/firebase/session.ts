export const syncAuthSession = async (idToken: string | null) => {
  if (!idToken) {
    await fetch("/api/auth/session", { method: "DELETE" });
    return;
  }

  await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });
};
