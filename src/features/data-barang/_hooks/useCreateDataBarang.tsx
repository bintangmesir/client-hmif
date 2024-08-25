import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataBarangSchema } from "../schema";
import { useMutation } from "react-query";
import { postBarang } from "@/services/barang";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type CreateDataBarangType = UseFormReturn<
  z.infer<typeof DataBarangSchema>
>;

const useCreateDataBarang = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: postBarangMutation } = useMutation({
    mutationKey: ["postBarang"],
    mutationFn: (formData: FormData) => postBarang(formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-barang" });
      }
    },
  });
  const form: CreateDataBarangType = useForm<z.infer<typeof DataBarangSchema>>({
    resolver: zodResolver(DataBarangSchema),
    defaultValues: {
      nama: "",
      jumlah: 0,
      baik: 0,
      rusakBerat: 0,
      rusakRingan: 0,
      keterangan: "",
    },
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
      await postBarangMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataBarang;
