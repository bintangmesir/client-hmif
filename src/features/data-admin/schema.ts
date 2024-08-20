import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/data/file";
import { z } from "zod";

export type DataAdminType = {
  id: string;
  name: string;
  email: string;
  password: string;
  fotoProfile: string | null;
  role:
    | "super_admin"
    | "kadep_kominfo"
    | "staff_kominfo"
    | "kadep_prhp"
    | "staff_prhp";
  createdAt: number;
  updatedAt: number;
};

export const DataAdminCreateSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nama harus diisi")
      .max(100, "Nama tidak boleh lebih dari 100 karakter"),
    email: z
      .string()
      .email("Alamat email tidak valid")
      .min(1, "Email harus diisi")
      .max(100, "Email tidak boleh lebih dari 100 karakter"),
    password: z
      .string()
      .min(6, "Kata sandi harus memiliki setidaknya 6 karakter")
      .max(255, "Kata sandi tidak boleh lebih dari 255 karakter"),
    confirmPassword: z.string(),
    fotoProfile: z
      .custom<FileList>()
      .nullable()
      .refine((files) => !files || files.length > 0, {
        message: "Unggahan foto diperlukan",
      })
      .refine((files) => !files || files.length <= 1, {
        message: "Maksimal hanya 1 foto yang dapat diunggah",
      })
      .refine(
        (files) =>
          !files ||
          (Array.from(files).every((file) => file.size <= MAX_FILE_SIZE) &&
            Array.from(files).every((file) =>
              ACCEPTED_IMAGE_TYPES.includes(file.type),
            )),
        {
          message: "Ukuran file maksimum adalah 1MB.",
        },
      )
      .refine(
        (files) =>
          !files ||
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          ),
        "Hanya file .jpg, .jpeg, dan .png yang diizinkan",
      ),
    role: z.enum(
      [
        "super_admin",
        "kadep_kominfo",
        "staff_kominfo",
        "kadep_prhp",
        "staff_prhp",
      ],
      {
        errorMap: (issue) => {
          if (issue.code === "invalid_enum_value") {
            return {
              message:
                "Peran harus salah satu dari: super_admin, kadep_kominfo, staff_kominfo, kadep_prhp, staff_prhp",
            };
          }
          return { message: "Peran tidak valid" };
        },
      },
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

export const DataAdminUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Nama harus diisi")
    .max(100, "Nama tidak boleh lebih dari 100 karakter"),
  email: z
    .string()
    .email("Alamat email tidak valid")
    .min(1, "Email harus diisi")
    .max(100, "Email tidak boleh lebih dari 100 karakter"),
  fotoProfile: z
    .custom<FileList>()
    .nullable()
    .refine((files) => !files || files.length > 0, {
      message: "Unggahan foto diperlukan",
    })
    .refine((files) => !files || files.length <= 1, {
      message: "Maksimal hanya 1 foto yang dapat diunggah",
    })
    .refine(
      (files) =>
        !files ||
        (Array.from(files).every((file) => file.size <= MAX_FILE_SIZE) &&
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          )),
      {
        message: "Ukuran file maksimum adalah 1MB.",
      },
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      "Hanya file .jpg, .jpeg, dan .png yang diizinkan",
    ),
});

export const DataAdminUpdatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Kata sandi baru harus memiliki setidaknya 6 karakter")
      .max(255, "Kata sandi baru tidak boleh lebih dari 255 karakter"),
    oldPassword: z
      .string()
      .min(6, "Kata sandi lama harus memiliki setidaknya 6 karakter")
      .max(255, "Kata sandi lama tidak boleh lebih dari 255 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

export const DataAdminResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Kata sandi harus memiliki setidaknya 6 karakter")
      .max(255, "Kata sandi tidak boleh lebih dari 255 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });
