import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataArtikelType } from "@/features/data-artikel/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getArtikel() {
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/artikel`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
  });
  return (await response.json()) as { data: DataArtikelType[] };
}

export async function getArtikelById(id: string) {
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/artikel/${id}`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
  });
  return (await response.json()) as { data: DataArtikelType };
}

export async function postArtikel(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/artikel`, {
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
  return (await response.json()) as {
    id: string;
    status: string;
    message: string;
  };
}

export async function patchArtikel(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/artikel/${id}`, {
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

export async function deleteArtikel(id: string) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  await fetch(`${VITE_APP_URI_SERVER}/v1/artikel/${id}`, {
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
