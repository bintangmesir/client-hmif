import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataYoutubeType } from "@/features/data-youtube/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getYoutube(offset: number, limit?: number | undefined) {
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/youtube?offset=${offset}${limit ? `&limit=${limit}` : ""}`,
    {
      method: "GET",
      signal: controller.signal,
      mode: "cors",
      credentials: "include",
    },
  );
  return (await response.json()) as {
    data: DataYoutubeType[];
    count: number;
    offset: number;
    limit: number;
  };
}

export async function getYoutubeById(id: string) {
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/youtube/${id}`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
  });
  return (await response.json()) as { data: DataYoutubeType };
}

export async function postYoutube(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/youtube`, {
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

export async function patchYoutube(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/youtube/${id}`, {
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

export async function deleteYoutube(id: string) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  await fetch(`${VITE_APP_URI_SERVER}/v1/youtube/${id}`, {
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
