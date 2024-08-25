import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataPengurusCreateSchema } from "../schema";
import { useMutation } from "react-query";
import { postPengurus } from "@/services/pengurus";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataPengurusCreateType = UseFormReturn<
  z.infer<typeof DataPengurusCreateSchema>
>;

const useCreateDataPengurus = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: postPengurusMutation } = useMutation({
    mutationKey: ["postPengurus"],
    mutationFn: (formData: FormData) => postPengurus(formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-pengurus" });
      }
    },
  });
  const form: DataPengurusCreateType = useForm<
    z.infer<typeof DataPengurusCreateSchema>
  >({
    resolver: zodResolver(DataPengurusCreateSchema),
    defaultValues: {
      name: "",
      departemen: "departemen_kominfo",
      jabatan: "staff_departemen",
    },
  });
  const onSubmit = async (values: z.infer<typeof DataPengurusCreateSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("departemen", values.departemen);
    formData.append("jabatan", values.jabatan);
    if (values.foto) {
      for (let i = 0; i < values.foto.length; i++) {
        formData.append("foto", values.foto[i]);
      }
    }
    try {
      await postPengurusMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataPengurus;
