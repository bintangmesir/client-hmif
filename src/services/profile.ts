import { VITE_APP_URI_SERVER } from "@/data/env";
import { PostOrPatchResponseType } from "@/utils/type";
import { getCookie } from "react-use-cookie";

export async function patchProfile(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(`${VITE_APP_URI_SERVER}/v1/profile`, {
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

export async function patchUpdatePassword(formData: FormData) {
  const csrf_token = getCookie("csrf_token");
  const accessToken = getCookie("accessToken");
  const controller = new AbortController();

  const response = await fetch(
    `${VITE_APP_URI_SERVER}/v1/profile/update-password`,
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
