import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAlumniSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getAlumniById, patchAlumni } from "@/services/alumni";

export type UpdateDataAlumniType = UseFormReturn<
  z.infer<typeof DataAlumniSchema>
>;

const useUpdateDataAlumni = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataAlumniById", { id: id }],
    queryFn: async () => getAlumniById(id),
  });
  const {
    isError,
    isLoading,
    mutateAsync: patchAlumniMutation,
  } = useMutation({
    mutationKey: ["patchAlumni"],
    mutationFn: (formData: FormData) => patchAlumni(id, formData),
  });

  const form: UpdateDataAlumniType = useForm<z.infer<typeof DataAlumniSchema>>({
    resolver: zodResolver(DataAlumniSchema),
    defaultValues: {
      nama: "",
      angkatan: "",
      noTelephone: "",
    },
    values: data
      ? {
          nama: data.data.nama,
          angkatan: data.data.angkatan,
          noTelephone: data.data.noTelephone,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataAlumniSchema>) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("angkatan", values.angkatan);
    formData.append("noTelephone", values.noTelephone);

    try {
      await patchAlumniMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-alumni" });
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataAlumni;
