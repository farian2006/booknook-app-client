import { authClient } from "./auth-client";
export async function getApiAuthHeaders() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    return null;
  }

  return { Authorization: `Bearer ${data.token}` };
}
