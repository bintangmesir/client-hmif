import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAdminUpdateSchema } from "../schema";
import { useEffect, useState } from "react";
import { splitStringToArray } from "@/utils/stringToArray";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getAdminById, patchAdmin } from "@/services/admin";

export type DataAdminUpdateType = UseFormReturn<
  z.infer<typeof DataAdminUpdateSchema>
>;

const useUpdateDataAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataAdminById", { id: id }],
    queryFn: async () => getAdminById(id),
  });
  const {
    isError,
    isLoading,
    mutateAsync: patchAdminMutation,
  } = useMutation({
    mutationKey: ["patchAdmin"],
    mutationFn: (formData: FormData) => patchAdmin(id, formData),
  });
  const [fotoProfile, setFotoProfile] = useState<string[]>();

  useEffect(() => {
    if (data) {
      const formatted = data.data.fotoProfile
        ? splitStringToArray(data.data.fotoProfile)
        : [];
      setFotoProfile(formatted);
    }
  }, [data]);

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
          fotoProfile: null,
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

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-admin" });
  };
  return { form, isLoading, onSubmit, fotoProfile, id };
};

export default useUpdateDataAdmin;
