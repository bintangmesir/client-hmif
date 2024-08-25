import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataAlumniType } from "@/features/data-alumni/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getAlumni(offset: number) {
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/alumni?offset=${offset}`,
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
    data: DataAlumniType[];
    count: number;
    offset: number;
    limit: number;
  };
}

export async function getAlumniById(id: string) {
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/alumni/${id}`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return (await response.json()) as { data: DataAlumniType };
}

export async function postAlumni(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/alumni`, {
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

export async function patchAlumni(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/alumni/${id}`, {
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

export async function deleteAlumni(id: string) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  await fetch(`${VITE_APP_URI_SERVER}/v1/alumni/${id}`, {
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
