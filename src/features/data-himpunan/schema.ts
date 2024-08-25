import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/data/file";
import { z } from "zod";

export type DataHimpunanType = {
  id: string;
  jumlahPengurus: number;
  jumlahMahasiswa: number;
  jumlahDepartemen: number;
  namaProker: string;
  galeriMahasiswa: string | null;
  createdAt: number;
  updatedAt: number;
};

export const DataHimpunanUpdateSchema = z.object({
  namaProker: z
    .string()
    .min(1, { message: "Nama proker harus diisi." })
    .max(100, { message: "Nama proker tidak boleh melebihi 100 karakter." }),
  jumlahPengurus: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Jumlah harus berupa angka positif atau nol." }),
  jumlahMahasiswa: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Jumlah harus berupa angka positif atau nol." }),
  jumlahDepartemen: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Jumlah harus berupa angka positif atau nol." }),
  galeriMahasiswa: z
    .union([
      z.string().nullable(), // Allow string type for thumbnail
      z.instanceof(FileList, { message: "Galeri himpunan harus berupa file." }),
    ])
    .refine(
      (value) => {
        if (typeof value === "string") {
          // If thumbnail is a string, skip validation
          return true;
        }
        if (value instanceof FileList) {
          // If thumbnail is a FileList, perform validation
          return value.length <= 9;
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
