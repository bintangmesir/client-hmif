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
