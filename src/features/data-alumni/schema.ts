import { z } from "zod";

export type DataAlumniType = {
  id: string;
  angkatan: string;
  nama: string;
  noTelephone: string;
  createdAt: number;
  updatedAt: number;
};

export const DataAlumniSchema = z.object({
  angkatan: z
    .string()
    .min(1, "Angkatan tidak boleh kosong.")
    .max(4, "Angkatan harus memiliki maksimal 4 karakter."),
  nama: z
    .string()
    .min(1, "Nama tidak boleh kosong.")
    .max(100, "Nama harus memiliki maksimal 100 karakter."),
  noTelephone: z
    .string()
    .min(1, "Nomor telepon tidak boleh kosong.")
    .max(15, "Nomor telepon harus memiliki maksimal 15 karakter."),
});
