import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataPengurusCreateSchema } from "../schema";
import { useMutation } from "react-query";
import { postPengurus } from "@/services/pengurus";
import { useLocation, useNavigate } from "@tanstack/react-router";

export type DataPengurusCreateType = UseFormReturn<
  z.infer<typeof DataPengurusCreateSchema>
>;

const useCreateDataPengurus = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const {
    isError,
    isLoading,
    mutateAsync: postPengurusMutation,
  } = useMutation({
    mutationKey: ["postPengurus"],
    mutationFn: (formData: FormData) => postPengurus(formData),
  });
  const form: DataPengurusCreateType = useForm<
    z.infer<typeof DataPengurusCreateSchema>
  >({
    resolver: zodResolver(DataPengurusCreateSchema),
    defaultValues: {
      name: "",
      departemen: "departemen_kominfo",
      jabatan: "staff_departemen",
      foto: null,
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

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-pengurus" });
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataPengurus;
