import {
  VITE_APP_INSTAGRAM_API_KEY,
  VITE_APP_INSTAGRAM_API_URL,
} from "@/data/env";
import { InstagramDataType } from "@/features/data-instagram/schema";

export async function getInstagram(url?: string | undefined) {
  const controller = new AbortController();
  const initialUrl = `${
    VITE_APP_INSTAGRAM_API_URL
  }/me/media?fields=id,media_type,media_url,timestamp,thumbnail_url&access_token=${
    VITE_APP_INSTAGRAM_API_KEY
  }&limit=6`;
  const response = await fetch(url ? url : initialUrl, {
    method: "GET",
    signal: controller.signal,
  });
  return (await response.json()) as {
    data: InstagramDataType[];
    paging: {
      next: string;
    };
  };
}

export async function getInstagramById(id: string) {
  const controller = new AbortController();

  const response = await fetch(
    `${
      VITE_APP_INSTAGRAM_API_URL
    }/${id}?fields=caption,id,media_type,media_url,timestamp,thumbnail_url,children{media_url,media_type}&access_token=${
      VITE_APP_INSTAGRAM_API_KEY
    }`,
    {
      method: "GET",
      signal: controller.signal,
    },
  );
  return (await response.json()) as InstagramDataType;
}
