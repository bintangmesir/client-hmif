import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataPengurusUpdateSchema } from "../schema";
import { useEffect, useState } from "react";
import { splitStringToArray } from "@/utils/stringToArray";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getPengurusById, patchPengurus } from "@/services/pengurus";

export type DataPengurusUpdateType = UseFormReturn<
  z.infer<typeof DataPengurusUpdateSchema>
>;

const useUpdateDataPengurus = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataPengurusById", { id: id }],
    queryFn: async () => getPengurusById(id),
  });
  const {
    isError,
    isLoading,
    mutateAsync: patchPengurusMutation,
  } = useMutation({
    mutationKey: ["patchPengurus"],
    mutationFn: (formData: FormData) => patchPengurus(id, formData),
  });
  const [foto, setFoto] = useState<string[]>();

  useEffect(() => {
    if (data) {
      const formatted = data.data.foto
        ? splitStringToArray(data.data.foto)
        : [];
      setFoto(formatted);
    }
  }, [data]);

  const form: DataPengurusUpdateType = useForm<
    z.infer<typeof DataPengurusUpdateSchema>
  >({
    resolver: zodResolver(DataPengurusUpdateSchema),
    defaultValues: {
      name: "",
      departemen: "departemen_kominfo",
      jabatan: "staff_departemen",
      foto: null,
    },
    values: data
      ? {
          name: data.data.name,
          departemen: data.data.departemen,
          jabatan: data.data.jabatan,
          foto: null,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataPengurusUpdateSchema>) => {
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
      await patchPengurusMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-pengurus" });
  };
  return { form, isLoading, onSubmit, foto, id };
};

export default useUpdateDataPengurus;
