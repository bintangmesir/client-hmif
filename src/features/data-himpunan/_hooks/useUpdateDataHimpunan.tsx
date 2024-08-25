import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataHimpunanUpdateSchema } from "../schema";
import { useMutation, useQuery } from "react-query";
import { getHimpunan, patchHimpunan } from "@/services/himpunan";
import { useFlashMessageContext } from "@/context/flash-message-provider";
import { useState } from "react";

export type DataHimpunanUpdateType = UseFormReturn<
  z.infer<typeof DataHimpunanUpdateSchema>
>;

const useUpdateDataHimpunan = () => {
  const [id, setId] = useState("");
  const { setFlashMessage } = useFlashMessageContext();
  const { data } = useQuery({
    queryKey: ["dataHimpunan"],
    queryFn: async () => getHimpunan(),
    onSuccess: (item) => {
      setId(item.data.id);
    },
  });
  const { isLoading, mutateAsync: patchHimpunanMutation } = useMutation({
    mutationKey: ["patchHimpunan"],
    mutationFn: (formData: FormData) => patchHimpunan(id, formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        setFlashMessage({
          title: "SUCCESS",
          description: item.message,
          status: item.status,
        });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const form: DataHimpunanUpdateType = useForm<
    z.infer<typeof DataHimpunanUpdateSchema>
  >({
    resolver: zodResolver(DataHimpunanUpdateSchema),
    defaultValues: {
      namaProker: "",

      jumlahDepartemen: 0,
      jumlahMahasiswa: 0,
      jumlahPengurus: 0,
      galeriMahasiswa: null,
    },
    values: data
      ? {
          namaProker: data.data.namaProker,
          jumlahDepartemen: data.data.jumlahDepartemen,
          jumlahMahasiswa: data.data.jumlahMahasiswa,
          jumlahPengurus: data.data.jumlahPengurus,
          galeriMahasiswa: data.data.galeriMahasiswa as unknown as FileList,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataHimpunanUpdateSchema>) => {
    const formData = new FormData();
    formData.append("namaProker", values.namaProker);
    formData.append("jumlahDepartemen", values.jumlahDepartemen.toString());
    formData.append("jumlahPengurus", values.jumlahPengurus.toString());
    formData.append("jumlahMahasiswa", values.jumlahMahasiswa.toString());
    if (values.galeriMahasiswa) {
      for (let i = 0; i < values.galeriMahasiswa.length; i++) {
        formData.append("galeriMahasiswa", values.galeriMahasiswa[i]);
      }
    }

    try {
      await patchHimpunanMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataHimpunan;
