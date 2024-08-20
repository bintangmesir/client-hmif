import { VITE_APP_URI_SERVER } from "@/data/env";

export async function getCsrf() {
  const response = await fetch(`${VITE_APP_URI_SERVER}/csrf-token`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  return (await response.json()) as { status: "success" };
}
