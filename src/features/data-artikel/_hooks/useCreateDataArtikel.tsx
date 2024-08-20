import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArtikelContentSubTipeEnum,
  ArtikelContentTipeEnum,
  DataArtikelCreateSchema,
} from "../schema";
import { useMutation } from "react-query";
import { postArtikel } from "@/services/artikel";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export type CreateDataArtikelType = UseFormReturn<
  z.infer<typeof DataArtikelCreateSchema>
>;

const useCreateDataArtikel = () => {
  const [id, setId] = useState<null | string>(null);
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const {
    data,
    isError,
    isLoading,
    mutateAsync: postArtikelMutation,
  } = useMutation({
    mutationKey: ["postArtikel"],
    mutationFn: (formData: FormData) => postArtikel(formData),
    onSuccess: () => {
      if (data) {
        setId(data?.id);
      }
    },
  });
  const form: CreateDataArtikelType = useForm<
    z.infer<typeof DataArtikelCreateSchema>
  >({
    resolver: zodResolver(DataArtikelCreateSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      commentEnabled: "true",
      thumbnail: null,
      artikelContent: [
        {
          tipe: ArtikelContentTipeEnum.description,
          subTipe: ArtikelContentSubTipeEnum.default,
          content: "",
        },
      ],
    },
  });
  const onSubmit = async (values: z.infer<typeof DataArtikelCreateSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subTitle", values.subTitle);
    formData.append("commentEnabled", values.commentEnabled ? "true" : "false");
    if (values.thumbnail) {
      for (let i = 0; i < values.thumbnail.length; i++) {
        formData.append("thumbnail", values.thumbnail[i]);
      }
    }
    for (let i = 0; i < values.artikelContent.length; i++) {
      const contentItem = values.artikelContent[i];
      const newData = { ...contentItem, index: i };
      formData.append("artikelContent", JSON.stringify(newData));

      // Handle image type
      if (contentItem.tipe === "image") {
        if (contentItem.content && contentItem.content instanceof FileList) {
          for (let j = 0; j < contentItem.content.length; j++) {
            const file = contentItem.content[j];
            if (file) {
              formData.append("artikelContentImage", file);
            }
          }
        } else if (contentItem.content !== null) {
          console.error("Expected content to be FileList for image type.");
        }
      }
    }
    try {
      await postArtikelMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-artikel" });
  };
  return { form, isLoading, onSubmit, id };
};

export default useCreateDataArtikel;
