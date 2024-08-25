import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAlumniSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getAlumniById, patchAlumni } from "@/services/alumni";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type UpdateDataAlumniType = UseFormReturn<
  z.infer<typeof DataAlumniSchema>
>;

const useUpdateDataAlumni = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataAlumniById", { id: id }],
    queryFn: async () => getAlumniById(id),
  });
  const { isLoading, mutateAsync: patchAlumniMutation } = useMutation({
    mutationKey: ["patchAlumni"],
    mutationFn: (formData: FormData) => patchAlumni(id, formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-alumni" });
      }
    },
  });

  const form: UpdateDataAlumniType = useForm<z.infer<typeof DataAlumniSchema>>({
    resolver: zodResolver(DataAlumniSchema),
    defaultValues: {
      nama: "",
      angkatan: 0,
      noTelephone: "",
    },
    values: data
      ? {
          nama: data.data.nama,
          angkatan: +data.data.angkatan,
          noTelephone: data.data.noTelephone,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataAlumniSchema>) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("angkatan", values.angkatan.toString());
    formData.append("noTelephone", values.noTelephone);

    try {
      await patchAlumniMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataAlumni;
