import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataBarangSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getBarangById, patchBarang } from "@/services/barang";

export type UpdateDataBarangType = UseFormReturn<
  z.infer<typeof DataBarangSchema>
>;

const useUpdateDataBarang = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataBarangById", { id: id }],
    queryFn: async () => getBarangById(id),
  });
  const {
    isError,
    isLoading,
    mutateAsync: patchBarangMutation,
  } = useMutation({
    mutationKey: ["patchBarang"],
    mutationFn: (formData: FormData) => patchBarang(id, formData),
  });

  const form: UpdateDataBarangType = useForm<z.infer<typeof DataBarangSchema>>({
    resolver: zodResolver(DataBarangSchema),
    defaultValues: {
      nama: "",
      jumlah: 0,
      baik: 0,
      rusakBerat: 0,
      rusakRingan: 0,
      keterangan: "",
    },
    values: data
      ? {
          nama: data.data.nama,
          jumlah: data.data.jumlah,
          baik: data.data.baik,
          rusakBerat: data.data.rusakBerat,
          rusakRingan: data.data.rusakRingan,
          keterangan: data.data.keterangan,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataBarangSchema>) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("jumlah", values.jumlah.toString());
    formData.append("baik", values.baik.toString());
    formData.append("rusakBerat", values.rusakBerat.toString());
    formData.append("rusakRingan", values.rusakRingan.toString());
    formData.append("keterangan", values.keterangan);

    try {
      await patchBarangMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-barang" });
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataBarang;
