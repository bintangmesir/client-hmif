import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataBarangType } from "@/features/data-barang/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getBarang(offset: number) {
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/barang?offset=${offset}`,
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
    data: DataBarangType[];
    count: number;
    offset: number;
    limit: number;
  };
}

export async function getBarangById(id: string) {
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/barang/${id}`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return (await response.json()) as { data: DataBarangType };
}

export async function postBarang(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/barang`, {
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

export async function patchBarang(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/barang/${id}`, {
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

export async function deleteBarang(id: string) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  await fetch(`${VITE_APP_URI_SERVER}/v1/barang/${id}`, {
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
