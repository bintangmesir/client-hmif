import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAlumniSchema } from "../schema";
import { useMutation } from "react-query";
import { postAlumni } from "@/services/alumni";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type CreateDataAlumniType = UseFormReturn<
  z.infer<typeof DataAlumniSchema>
>;

const useCreateDataAlumni = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: postAlumniMutation } = useMutation({
    mutationKey: ["postAlumni"],
    mutationFn: (formData: FormData) => postAlumni(formData),
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
  const form: CreateDataAlumniType = useForm<z.infer<typeof DataAlumniSchema>>({
    resolver: zodResolver(DataAlumniSchema),
    defaultValues: {
      nama: "",
      angkatan: 0,
      noTelephone: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof DataAlumniSchema>) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("angkatan", values.angkatan.toString());
    formData.append("noTelephone", values.noTelephone);
    try {
      await postAlumniMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataAlumni;
