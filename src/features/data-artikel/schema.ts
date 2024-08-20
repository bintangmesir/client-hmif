import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/data/file";
import { z } from "zod";

export enum ArtikelContentTipeEnum {
  subTitle = "sub_title",
  description = "description",
  image = "image",
  code = "code",
  blockquote = "blockquote",
}

export enum ArtikelContentSubTipeEnum {
  default = "default",
  javascript = "javascript",
  typescript = "typescript",
  html = "html",
  css = "css",
  python = "python",
  java = "java",
  cPlusPlus = "cpp",
  cSharp = "csharp",
  ruby = "ruby",
  php = "php",
  go = "go",
  json = "json",
  scss = "scss",
  perl = "perl",
  r = "r",
  lua = "lua",
}

export type DataArtikelType = {
  id: string;
  title: string;
  subTitle: string;
  thumbnail: string | null;
  commentEnabled: "true" | "false";
  view: number;
  createdAt: number;
  updatedAt: number;
};

export type DataArtikelContentType = {
  index: number;
  tipe: "sub_title" | "description" | "image" | "code" | "blockquote";
  subTipe:
    | "default"
    | "javascript"
    | "typescript"
    | "html"
    | "css"
    | "python"
    | "java"
    | "cpp"
    | "csharp"
    | "ruby"
    | "php"
    | "go"
    | "json"
    | "scss"
    | "perl"
    | "r"
    | "lua";
  content: string | null;
};

const artikelContentSubTipe = z.enum([
  "default",
  "javascript",
  "typescript",
  "html",
  "css",
  "python",
  "java",
  "cpp",
  "csharp",
  "ruby",
  "php",
  "go",
  "json",
  "scss",
  "perl",
  "r",
  "lua",
]);

export const DataArtikelContentCreateFormSchema = z.discriminatedUnion("tipe", [
  z.object({
    tipe: z.literal("sub_title", {
      invalid_type_error: "Jenis tipe tidak valid.",
      required_error: "Tipe wajib diisi.",
    }),
    subTipe: artikelContentSubTipe,
    content: z.string().min(1, "Konten harus memiliki setidaknya 1 karakter."),
  }),
  z.object({
    tipe: z.literal("description", {
      invalid_type_error: "Jenis tipe tidak valid.",
      required_error: "Tipe wajib diisi.",
    }),
    subTipe: artikelContentSubTipe,
    content: z.string().min(1, "Konten harus memiliki setidaknya 1 karakter."),
  }),
  z.object({
    tipe: z.literal("blockquote", {
      invalid_type_error: "Jenis tipe tidak valid.",
      required_error: "Tipe wajib diisi.",
    }),
    subTipe: artikelContentSubTipe,
    content: z.string().min(1, "Konten harus memiliki setidaknya 1 karakter."),
  }),
  z.object({
    tipe: z.literal("code", {
      invalid_type_error: "Jenis tipe tidak valid.",
      required_error: "Tipe wajib diisi.",
    }),
    subTipe: artikelContentSubTipe,
    content: z.string().min(1, "Konten harus memiliki setidaknya 1 karakter."),
  }),
  z.object({
    tipe: z.literal("image", {
      invalid_type_error: "Jenis tipe tidak valid.",
      required_error: "Tipe wajib diisi.",
    }),
    subTipe: artikelContentSubTipe,
    content: z
      .custom<FileList>()
      .nullable()
      .refine((files) => !files || files.length > 0, {
        message: "Photo upload is required",
      })
      .refine((files) => !files || files.length <= 10, {
        message: "A maximum of 10 photos can be uploaded",
      })
      .refine(
        (files) =>
          !files ||
          (Array.from(files).every((file) => file.size <= MAX_FILE_SIZE) &&
            Array.from(files).every((file) =>
              ACCEPTED_IMAGE_TYPES.includes(file.type),
            )),
        {
          message: "Maximum file size is 1MB.",
        },
      )
      .refine(
        (files) =>
          !files ||
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          ),
        "Only .jpg, .jpeg, and .png files are allowed",
      ),
  }),
]);

export const DataArtikelCreateSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Judul harus diisi." })
    .max(255, { message: "Judul tidak boleh lebih dari 255 karakter." }),
  subTitle: z
    .string()
    .max(255, { message: "Subjudul tidak boleh lebih dari 255 karakter." }),
  thumbnail: z
    .custom<FileList>()
    .nullable()
    .refine((files) => !files || files.length > 0, {
      message: "Photo upload is required",
    })
    .refine((files) => !files || files.length <= 1, {
      message: "A maximum of 1 photos can be uploaded",
    })
    .refine(
      (files) =>
        !files ||
        (Array.from(files).every((file) => file.size <= MAX_FILE_SIZE) &&
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          )),
      {
        message: "Maximum file size is 1MB.",
      },
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      "Only .jpg, .jpeg, and .png files are allowed",
    ),
  commentEnabled: z.enum(["true", "false"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_enum_value") {
        return {
          message: "Comment enabled harus salah satu dari: true atau false.",
        };
      }
      return { message: "Comment enabled tidak valid." };
    },
  }),
  artikelContent: z.array(DataArtikelContentCreateFormSchema),
});

export const DataArtikelUpdateSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Judul harus diisi." })
    .max(255, { message: "Judul tidak boleh lebih dari 255 karakter." }),
  subTitle: z
    .string()
    .max(255, { message: "Subjudul tidak boleh lebih dari 255 karakter." }),
  thumbnail: z
    .custom<FileList>()
    .nullable()
    .refine((files) => !files || files.length > 0, {
      message: "Photo upload is required",
    })
    .refine((files) => !files || files.length <= 1, {
      message: "A maximum of 1 photos can be uploaded",
    })
    .refine(
      (files) =>
        !files ||
        (Array.from(files).every((file) => file.size <= MAX_FILE_SIZE) &&
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          )),
      {
        message: "Maximum file size is 1MB.",
      },
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      "Only .jpg, .jpeg, and .png files are allowed",
    ),
  commentEnabled: z.enum(["true", "false"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_enum_value") {
        return {
          message: "Comment enabled harus salah satu dari: true atau false.",
        };
      }
      return { message: "Comment enabled tidak valid." };
    },
  }),
});
