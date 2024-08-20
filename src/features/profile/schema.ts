import { z } from "zod";

const MAX_FILE_SIZE = 1000000; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ProfileSchema = z.object({
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

export const UpdatePasswordSchema = z
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
