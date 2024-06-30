import { API_DOMAIN } from "../../constants";

export const getServerUsers = async (token: string) =>
  await fetch(`${API_DOMAIN}/api/v1/auth/users`, {
    method: "GET",
    headers: { Authorization: `Token ${token}` },
    next: { revalidate: 2 },
  });

export const getServerCurrentUser = async (token: string) => (
  await fetch(`${API_DOMAIN}/api/v1/auth/users/me`, {
    method: "GET",
    headers: { Authorization: `Token ${token}` },
    next: { revalidate: 2 },
  })
)
