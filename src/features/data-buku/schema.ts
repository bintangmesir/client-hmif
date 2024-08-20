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
  tahunTerbit: z
    .string()
    .length(4, { message: "Tahun terbit harus terdiri dari 4 digit." }),
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
  tahunTerbit: z
    .string()
    .length(4, { message: "Tahun terbit harus terdiri dari 4 digit." }),
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
});
