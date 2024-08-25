import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataPengurusUpdateSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getPengurusById, patchPengurus } from "@/services/pengurus";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataPengurusUpdateType = UseFormReturn<
  z.infer<typeof DataPengurusUpdateSchema>
>;

const useUpdateDataPengurus = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataPengurusById", { id: id }],
    queryFn: async () => getPengurusById(id),
  });
  const { isLoading, mutateAsync: patchPengurusMutation } = useMutation({
    mutationKey: ["patchPengurus"],
    mutationFn: (formData: FormData) => patchPengurus(id, formData),
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
          foto: data.data.foto as unknown as FileList,
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
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataPengurus;
