import { VITE_APP_URI_SERVER } from "@/data/env";
import { DataHimpunanType } from "@/features/data-himpunan/schema";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function getHimpunan() {
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/himpunan`, {
    method: "GET",
    signal: controller.signal,
    mode: "cors",
    credentials: "include",
  });
  return (await response.json()) as {
    data: DataHimpunanType;
  };
}

export async function patchHimpunan(id: string, formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/himpunan/${id}`, {
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
