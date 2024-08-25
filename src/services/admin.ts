import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataAdminType } from "@/features/data-admin/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getAdmin(offset: number) {
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/admin?offset=${offset}`,
    {
      method: "GET",
      signal: controller.signal,
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return (await response.json()) as {
    data: DataAdminType[];
    count: number;
    offset: number;
    limit: number;
  };
}

export async function getAdminById(id: string) {
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
  return (await response.json()) as { data: DataAdminType };
}

export async function postAdmin(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/admin`, {
    method: "POST",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      "X-Csrf-Token": csrf_token,
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  return (await response.json()) as PostOrPatchResponseType;
}

export async function patchAdmin(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/admin/${id}`, {
    method: "PATCH",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      "X-Csrf-Token": csrf_token,
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  return (await response.json()) as PostOrPatchResponseType;
}

export async function patchUpdatePassword(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/update-password/${id}`,
    {
      method: "PATCH",
      signal: controller.signal,
      mode: "cors",
      credentials: "include",
      headers: {
        "X-Csrf-Token": csrf_token,
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    },
  );
  return (await response.json()) as PostOrPatchResponseType;
}

export async function patchResetPassword(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/reset-password/${id}`,
    {
      method: "PATCH",
      signal: controller.signal,
      mode: "cors",
      credentials: "include",
      headers: {
        "X-Csrf-Token": csrf_token,
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    },
  );
  return (await response.json()) as PostOrPatchResponseType;
}

export async function deleteAdmin(id: string) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  await fetch(`${VITE_APP_URI_SERVER}/v1/admin/${id}`, {
    method: "DELETE",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      "X-Csrf-Token": csrf_token,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return;
}
