import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataBukuUpdateSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getBukuById, patchBuku } from "@/services/buku";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataBukuUpdateType = UseFormReturn<
  z.infer<typeof DataBukuUpdateSchema>
>;

const useUpdateDataBuku = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataBukuById", { id: id }],
    queryFn: async () => getBukuById(id),
  });
  const { isLoading, mutateAsync: patchBukuMutation } = useMutation({
    mutationKey: ["patchBuku"],
    mutationFn: (formData: FormData) => patchBuku(id, formData),
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
      tahunTerbit: 0,
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
          tahunTerbit: +data.data.tahunTerbit,
          jumlah: data.data.jumlah,
          cover: data.data.cover as unknown as FileList,
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
    formData.append("tahunTerbit", values.tahunTerbit.toString());
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
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataBuku;
