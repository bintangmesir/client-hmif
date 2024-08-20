import { VITE_APP_URI_SERVER } from "@/data/env";
import { AdminType } from "@/context/auth-provider";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getAccessToken() {
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/refresh-token`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
  });

  return (await response.json()) as PostOrPatchResponseType;
}

export async function getActiveUser(id: string) {
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/admin/${id}`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (await response.json()) as { data: AdminType };
}

export async function postLogin(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/login`, {
    method: "POST",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      "X-Csrf-Token": csrf_token,
    },
    body: formData,
  });

  return (await response.json()) as PostOrPatchResponseType;
}

export async function postLogout() {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/logout`, {
    method: "POST",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      "X-Csrf-Token": csrf_token,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return (await response.json()) as PostOrPatchResponseType;
}
