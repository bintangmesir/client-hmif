import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataBukuCreateSchema } from "../schema";
import { useMutation } from "react-query";
import { postBuku } from "@/services/buku";
import { useLocation, useNavigate } from "@tanstack/react-router";

export type DataBukuCreateType = UseFormReturn<
  z.infer<typeof DataBukuCreateSchema>
>;

const useCreateDataBuku = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const {
    isError,
    isLoading,
    mutateAsync: postBukuMutation,
  } = useMutation({
    mutationKey: ["postBuku"],
    mutationFn: (formData: FormData) => postBuku(formData),
  });
  const form: DataBukuCreateType = useForm<
    z.infer<typeof DataBukuCreateSchema>
  >({
    resolver: zodResolver(DataBukuCreateSchema),
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
  });
  const onSubmit = async (values: z.infer<typeof DataBukuCreateSchema>) => {
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
      await postBukuMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-buku" });
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataBuku;
