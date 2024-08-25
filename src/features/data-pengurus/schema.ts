import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/data/file";
import { z } from "zod";

export type DataPengurusType = {
  id: string;
  name: string;
  departemen:
    | "kahim_wakahim"
    | "sekretaris"
    | "bendahara"
    | "departemen_iptek"
    | "departemen_kominfo"
    | "departemen_kaderisasi"
    | "departemen_prhp"
    | "departemen_pengmas";
  jabatan:
    | "ketua_himpunan"
    | "wakil_ketua_himpunan"
    | "sekretaris_1"
    | "sekretaris_2"
    | "bendahara_1"
    | "bendahara_2"
    | "kepala_departemen"
    | "staff_departemen";
  foto: string | null;
  createdAt: number;
  updatedAt: number;
};

export const DataPengurusCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi." })
    .max(100, { message: "Nama tidak boleh lebih dari 100 karakter." }),
  departemen: z.enum(
    [
      "kahim_wakahim",
      "sekretaris",
      "bendahara",
      "departemen_iptek",
      "departemen_kominfo",
      "departemen_kaderisasi",
      "departemen_prhp",
      "departemen_pengmas",
    ],
    {
      errorMap: (issue) => {
        if (issue.code === "invalid_enum_value") {
          return {
            message:
              "Departemen harus salah satu dari: kahim_wakahim, sekretaris, bendahara, departemen_iptek, departemen_kominfo, departemen_kaderisasi, departemen_prhp, departemen_pengmas.",
          };
        }
        return { message: "Departemen tidak valid." };
      },
    },
  ),
  jabatan: z.enum(
    [
      "ketua_himpunan",
      "wakil_ketua_himpunan",
      "sekretaris_1",
      "sekretaris_2",
      "bendahara_1",
      "bendahara_2",
      "kepala_departemen",
      "staff_departemen",
    ],
    {
      errorMap: (issue) => {
        if (issue.code === "invalid_enum_value") {
          return {
            message:
              "Jabatan harus salah satu dari: ketua_himpunan, wakil_ketua_himpunan, sekretaris_1, sekretaris_2, bendahara_1, bendahara_2, kepala_departemen, staff_departemen.",
          };
        }
        return { message: "Jabatan tidak valid." };
      },
    },
  ),
  foto: z
    .instanceof(FileList, {
      message: "Foto harus berupa file.",
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

export const DataPengurusUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi." })
    .max(100, { message: "Nama tidak boleh lebih dari 100 karakter." }),
  departemen: z.enum(
    [
      "kahim_wakahim",
      "sekretaris",
      "bendahara",
      "departemen_iptek",
      "departemen_kominfo",
      "departemen_kaderisasi",
      "departemen_prhp",
      "departemen_pengmas",
    ],
    {
      errorMap: (issue) => {
        if (issue.code === "invalid_enum_value") {
          return {
            message:
              "Departemen harus salah satu dari: kahim_wakahim, sekretaris, bendahara, departemen_iptek, departemen_kominfo, departemen_kaderisasi, departemen_prhp, departemen_pengmas.",
          };
        }
        return { message: "Departemen tidak valid." };
      },
    },
  ),
  jabatan: z.enum(
    [
      "ketua_himpunan",
      "wakil_ketua_himpunan",
      "sekretaris_1",
      "sekretaris_2",
      "bendahara_1",
      "bendahara_2",
      "kepala_departemen",
      "staff_departemen",
    ],
    {
      errorMap: (issue) => {
        if (issue.code === "invalid_enum_value") {
          return {
            message:
              "Jabatan harus salah satu dari: ketua_himpunan, wakil_ketua_himpunan, sekretaris_1, sekretaris_2, bendahara_1, bendahara_2, kepala_departemen, staff_departemen.",
          };
        }
        return { message: "Jabatan tidak valid." };
      },
    },
  ),
  foto: z
    .union([
      z.string().nullable(), // Allow string type for thumbnail
      z.instanceof(FileList, { message: "Foto harus berupa file." }),
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
