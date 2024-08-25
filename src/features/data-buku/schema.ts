import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/data/file";
import { z } from "zod";

export type DataBukuType = {
  id: string;
  judul: string;
  kode: string;
  penulis: string;
  tahunTerbit: string;
  penerbit: string;
  abstrak: string;
  jumlah: number;
  cover: string | null;
  createdAt: number;
  updatedAt: number;
};

export const DataBukuCreateSchema = z.object({
  judul: z
    .string()
    .min(1, { message: "Judul harus diisi." })
    .max(100, { message: "Judul tidak boleh melebihi 100 karakter." }),
  kode: z
    .string()
    .min(1, { message: "Kode harus diisi." })
    .max(10, { message: "Kode tidak boleh melebihi 10 karakter." }),
  penulis: z
    .string()
    .min(1, { message: "Penulis harus diisi." })
    .max(100, { message: "Penulis tidak boleh melebihi 100 karakter." }),
  tahunTerbit: z.coerce.number().int().nonnegative({
    message: "Tahun terbit harus berupa angka positif atau nol.",
  }),
  penerbit: z
    .string()
    .min(1, { message: "Penerbit harus diisi." })
    .max(100, { message: "Penerbit tidak boleh melebihi 100 karakter." }),
  abstrak: z.string().min(1, { message: "Abstrak harus diisi." }),
  jumlah: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Jumlah harus berupa angka positif atau nol." }),
  cover: z
    .instanceof(FileList, {
      message: "Cover harus berupa file.",
    })
    .refine((files) => files.length <= 1, {
      message: "A maximum of 1 photo can be uploaded",
    })
    .refine(
      (files) =>
        Array.from(files).every(
          (file) =>
            file.size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      {
        message:
          "File size must be less than 1MB and file type must be jpg, jpeg, or png.",
      },
    ),
});

export const DataBukuUpdateSchema = z.object({
  judul: z
    .string()
    .min(1, { message: "Judul harus diisi." })
    .max(100, { message: "Judul tidak boleh melebihi 100 karakter." }),
  kode: z
    .string()
    .min(1, { message: "Kode harus diisi." })
    .max(10, { message: "Kode tidak boleh melebihi 10 karakter." }),
  penulis: z
    .string()
    .min(1, { message: "Penulis harus diisi." })
    .max(100, { message: "Penulis tidak boleh melebihi 100 karakter." }),
  tahunTerbit: z.coerce.number().int().nonnegative({
    message: "Tahun terbit harus berupa angka positif atau nol.",
  }),
  penerbit: z
    .string()
    .min(1, { message: "Penerbit harus diisi." })
    .max(100, { message: "Penerbit tidak boleh melebihi 100 karakter." }),
  abstrak: z.string().min(1, { message: "Abstrak harus diisi." }),
  jumlah: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Jumlah harus berupa angka positif atau nol." }),
  cover: z
    .union([
      z.string().nullable(), // Allow string type for thumbnail
      z.instanceof(FileList, { message: "Cover harus berupa file." }),
    ])
    .refine(
      (value) => {
        if (typeof value === "string") {
          // If thumbnail is a string, skip validation
          return true;
        }
        if (value instanceof FileList) {
          // If thumbnail is a FileList, perform validation
          return value.length <= 1;
        }
        return false;
      },
      {
        message:
          "Photo upload is required and a maximum of 1 photo can be uploaded.",
      },
    )
    .refine(
      (value) => {
        if (typeof value === "string") {
          return true;
        }
        if (value instanceof FileList) {
          return Array.from(value).every(
            (file) =>
              file.size <= MAX_FILE_SIZE &&
              ACCEPTED_IMAGE_TYPES.includes(file.type),
          );
        }
        return false;
      },
      {
        message:
          "Maximum file size is 1MB and only .jpg, .jpeg, and .png files are allowed.",
      },
    ),
});
