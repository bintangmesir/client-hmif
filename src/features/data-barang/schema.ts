import { z } from "zod";

export type DataBarangType = {
  id: string;
  nama: string;
  jumlah: number;
  baik: number;
  rusakRingan: number;
  rusakBerat: number;
  keterangan: string;
  createdAt: number;
  updatedAt: number;
};

export const DataBarangSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama tidak boleh kosong.")
    .max(100, "Nama harus memiliki maksimal 100 karakter."),
  jumlah: z.coerce
    .number()
    .int("Jumlah harus berupa angka bulat.")
    .nonnegative("Jumlah tidak boleh negatif."),
  baik: z.coerce
    .number()
    .int("Baik harus berupa angka bulat.")
    .nonnegative("Baik tidak boleh negatif."),
  rusakRingan: z.coerce
    .number()
    .int("RusakRingan harus berupa angka bulat.")
    .nonnegative("RusakRingan tidak boleh negatif."),
  rusakBerat: z.coerce
    .number()
    .int("RusakBerat harus berupa angka bulat.")
    .nonnegative("RusakBerat tidak boleh negatif."),
  keterangan: z.string().min(1, "Keterangan tidak boleh kosong."),
});
