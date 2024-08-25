import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAdminUpdateSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getAdminById, patchAdmin } from "@/services/admin";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataAdminUpdateType = UseFormReturn<
  z.infer<typeof DataAdminUpdateSchema>
>;

const useUpdateDataAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataAdminById", { id: id }],
    queryFn: async () => getAdminById(id),
  });
  const { isLoading, mutateAsync: patchAdminMutation } = useMutation({
    mutationKey: ["patchAdmin"],
    mutationFn: (formData: FormData) => patchAdmin(id, formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-admin" });
      }
    },
  });

  const form: DataAdminUpdateType = useForm<
    z.infer<typeof DataAdminUpdateSchema>
  >({
    resolver: zodResolver(DataAdminUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      fotoProfile: null,
    },
    values: data
      ? {
          name: data.data.name,
          email: data.data.email,
          fotoProfile: data.data.fotoProfile as unknown as FileList,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataAdminUpdateSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.fotoProfile) {
      for (let i = 0; i < values.fotoProfile.length; i++) {
        formData.append("fotoProfile", values.fotoProfile[i]);
      }
    }

    try {
      await patchAdminMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataAdmin;
