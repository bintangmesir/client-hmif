import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataBukuType } from "@/features/data-buku/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getBuku(offset: number, limit?: number | undefined) {
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/buku?offset=${offset}${limit ? `&limit=${limit}` : ""}`,
    {
      method: "GET",
      signal: controller.signal,
      mode: "cors",
      credentials: "include",
    },
  );
  return (await response.json()) as {
    data: DataBukuType[];
    count: number;
    offset: number;
    limit: number;
  };
}

export async function getBukuById(id: string) {
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/buku/${id}`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
  });
  return (await response.json()) as { data: DataBukuType };
}

export async function postBuku(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/buku`, {
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

export async function patchBuku(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/buku/${id}`, {
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

export async function deleteBuku(id: string) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  await fetch(`${VITE_APP_URI_SERVER}/v1/buku/${id}`, {
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
