import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";

export async function getBearerToken() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({ headers: await headers() });

  if (!token) {
    redirect("/login");
  }

  return token;
}
