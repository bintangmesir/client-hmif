import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataBukuCreateSchema } from "../schema";
import { useMutation } from "react-query";
import { postBuku } from "@/services/buku";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataBukuCreateType = UseFormReturn<
  z.infer<typeof DataBukuCreateSchema>
>;

const useCreateDataBuku = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: postBukuMutation } = useMutation({
    mutationKey: ["postBuku"],
    mutationFn: (formData: FormData) => postBuku(formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-buku" });
      }
    },
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
      tahunTerbit: 0,
      jumlah: 0,
    },
  });
  const onSubmit = async (values: z.infer<typeof DataBukuCreateSchema>) => {
    const formData = new FormData();
    formData.append("abstrak", values.abstrak);
    formData.append("judul", values.judul);
    formData.append("kode", values.kode);
    formData.append("penerbit", values.penerbit);
    formData.append("penulis", values.penulis);
    formData.append("tahunTerbit", values.tahunTerbit.toString());
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
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataBuku;
