import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAlumniSchema } from "../schema";
import { useMutation } from "react-query";
import { postAlumni } from "@/services/alumni";
import { useLocation, useNavigate } from "@tanstack/react-router";

export type CreateDataAlumniType = UseFormReturn<
  z.infer<typeof DataAlumniSchema>
>;

const useCreateDataAlumni = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const {
    isError,
    isLoading,
    mutateAsync: postAlumniMutation,
  } = useMutation({
    mutationKey: ["postAlumni"],
    mutationFn: (formData: FormData) => postAlumni(formData),
  });
  const form: CreateDataAlumniType = useForm<z.infer<typeof DataAlumniSchema>>({
    resolver: zodResolver(DataAlumniSchema),
    defaultValues: {
      nama: "",
      angkatan: "",
      noTelephone: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof DataAlumniSchema>) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("angkatan", values.angkatan);
    formData.append("noTelephone", values.noTelephone);
    try {
      await postAlumniMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-alumni" });
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataAlumni;
