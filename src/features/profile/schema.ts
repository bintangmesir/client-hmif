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
    .union([
      z.string().nullable(), // Allow string type for thumbnail
      z.instanceof(FileList, { message: "Foto profile harus berupa file." }),
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
