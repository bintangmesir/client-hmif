import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataArtikelUpdateSchema } from "../schema";
import { useEffect, useState } from "react";
import { splitStringToArray } from "@/utils/stringToArray";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getArtikelById, patchArtikel } from "@/services/artikel";

export type DataArtikelUpdateType = UseFormReturn<
  z.infer<typeof DataArtikelUpdateSchema>
>;

const useUpdateDataArtikel = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataArtikelById", { id: id }],
    queryFn: async () => getArtikelById(id),
  });
  const {
    isError,
    isLoading,
    mutateAsync: patchArtikelMutation,
  } = useMutation({
    mutationKey: ["patchArtikel"],
    mutationFn: (formData: FormData) => patchArtikel(id, formData),
  });
  const [thumbnail, setThumbnail] = useState<string[]>();

  useEffect(() => {
    if (data) {
      const formatted = data.data.thumbnail
        ? splitStringToArray(data.data.thumbnail)
        : [];
      setThumbnail(formatted);
    }
  }, [data]);

  const form: DataArtikelUpdateType = useForm<
    z.infer<typeof DataArtikelUpdateSchema>
  >({
    resolver: zodResolver(DataArtikelUpdateSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      commentEnabled: "true",
      thumbnail: null,
    },
    values: data
      ? {
          title: data.data.title,
          subTitle: data.data.subTitle,
          commentEnabled: data.data.commentEnabled,
          thumbnail: null,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataArtikelUpdateSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subTitle", values.subTitle);
    formData.append("commentEnabled", values.commentEnabled);
    if (values.thumbnail) {
      for (let i = 0; i < values.thumbnail.length; i++) {
        formData.append("thumbnail", values.thumbnail[i]);
      }
    }

    try {
      await patchArtikelMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-artikel" });
  };
  return { form, isLoading, onSubmit, thumbnail, id };
};

export default useUpdateDataArtikel;
