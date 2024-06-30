export const getCurrentUser = (token: string) =>
  fetch("/externalApi/user", {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
    next: { revalidate: 120, tags: ["user"] },
  });
