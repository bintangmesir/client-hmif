import { z } from "zod";

export type DataYoutubeType = {
  id: string;
  judul: string;
  link: string;
  createdAt: number;
  updatedAt: number;
};

export const DataYoutubeSchema = z.object({
  judul: z
    .string()
    .min(1, "Judul tidak boleh kosong.")
    .max(100, "Judul harus memiliki maksimal 100 karakter."),
  link: z
    .string()
    .url("Link harus merupakan URL yang valid.")
    .max(255, "Link harus memiliki maksimal 255 karakter."),
});
