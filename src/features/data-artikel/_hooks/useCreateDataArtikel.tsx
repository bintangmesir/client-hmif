import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArtikelContentSubTipeEnum,
  ArtikelContentTipeEnum,
  DataArtikelCreateSchema,
} from "../schema";
import { useMutation } from "react-query";
import { postArtikel, postArtikelContent } from "@/services/artikel";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type CreateDataArtikelType = UseFormReturn<
  z.infer<typeof DataArtikelCreateSchema>
>;

const useCreateDataArtikel = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { mutateAsync: postArtikelMutation } = useMutation({
    mutationKey: ["postArtikel"],
    mutationFn: (formData: FormData) => postArtikel(formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      }
    },
  });

  const { isLoading, mutateAsync: postArtikelContentMutation } = useMutation({
    mutationKey: ["postArtikelContent"],
    mutationFn: ({ props }: { props: { id: string; formData: FormData } }) =>
      postArtikelContent({ props }),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
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

    try {
      const response = await postArtikelMutation(formData);
      for (let i = 0; i < values.artikelContent.length; i++) {
        const formDataArtikelContent = new FormData();
        formDataArtikelContent.append("index", i.toString());
        formDataArtikelContent.append("tipe", values.artikelContent[i].tipe);
        formDataArtikelContent.append(
          "subTipe",
          values.artikelContent[i].subTipe,
        );

        if (values.artikelContent[i].tipe !== "image") {
          if (values.artikelContent[i].content) {
            formDataArtikelContent.append(
              "content",
              values.artikelContent[i].content as string,
            );
          }
        } else {
          if (values.artikelContent[i].content as FileList) {
            // Ensure content is a FileList
            if (values.artikelContent[i].content instanceof FileList) {
              for (
                let j = 0;
                j < (values.artikelContent[i].content as FileList).length;
                j++
              ) {
                formDataArtikelContent.append(
                  "content",
                  (values.artikelContent[i] as { content: FileList }).content[
                    j
                  ],
                );
              }
            } else {
              console.error("Content is not a FileList.");
            }
          }
        }

        try {
          await postArtikelContentMutation({
            props: { id: response.id, formData: formDataArtikelContent },
          });
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }

    navigate({ to: "/data-artikel" });
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataArtikel;
