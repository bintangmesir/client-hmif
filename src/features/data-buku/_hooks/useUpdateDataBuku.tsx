import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataBukuUpdateSchema } from "../schema";
import { useEffect, useState } from "react";
import { splitStringToArray } from "@/utils/stringToArray";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getBukuById, patchBuku } from "@/services/buku";

export type DataBukuUpdateType = UseFormReturn<
  z.infer<typeof DataBukuUpdateSchema>
>;

const useUpdateDataBuku = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataBukuById", { id: id }],
    queryFn: async () => getBukuById(id),
  });
  const {
    isError,
    isLoading,
    mutateAsync: patchBukuMutation,
  } = useMutation({
    mutationKey: ["patchBuku"],
    mutationFn: (formData: FormData) => patchBuku(id, formData),
  });
  const [cover, setCover] = useState<string[]>();

  useEffect(() => {
    if (data) {
      const formatted = data.data.cover
        ? splitStringToArray(data.data.cover)
        : [];
      setCover(formatted);
    }
  }, [data]);

  const form: DataBukuUpdateType = useForm<
    z.infer<typeof DataBukuUpdateSchema>
  >({
    resolver: zodResolver(DataBukuUpdateSchema),
    defaultValues: {
      abstrak: "",
      judul: "",
      kode: "",
      penerbit: "",
      penulis: "",
      tahunTerbit: "",
      jumlah: 0,
      cover: null,
    },
    values: data
      ? {
          abstrak: data.data.abstrak,
          judul: data.data.judul,
          kode: data.data.kode,
          penerbit: data.data.penerbit,
          penulis: data.data.penulis,
          tahunTerbit: data.data.tahunTerbit,
          jumlah: data.data.jumlah,
          cover: null,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataBukuUpdateSchema>) => {
    const formData = new FormData();
    formData.append("abstrak", values.abstrak);
    formData.append("judul", values.judul);
    formData.append("kode", values.kode);
    formData.append("penerbit", values.penerbit);
    formData.append("penulis", values.penulis);
    formData.append("tahunTerbit", values.tahunTerbit);
    formData.append("jumlah", values.jumlah.toString());
    if (values.cover) {
      for (let i = 0; i < values.cover.length; i++) {
        formData.append("cover", values.cover[i]);
      }
    }

    try {
      await patchBukuMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-buku" });
  };
  return { form, isLoading, onSubmit, cover, id };
};

export default useUpdateDataBuku;
