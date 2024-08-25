import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArtikelContentSubTipeEnum,
  ArtikelContentTipeEnum,
  DataArtikelUpdateSchema,
} from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import {
  getArtikelById,
  patchArtikel,
  postArtikelContent,
} from "@/services/artikel";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataArtikelUpdateType = UseFormReturn<
  z.infer<typeof DataArtikelUpdateSchema>
>;

const useUpdateDataArtikel = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataArtikelById", { id: id }],
    queryFn: async () => getArtikelById(id),
  });
  const { mutateAsync: patchArtikelMutation } = useMutation({
    mutationKey: ["patchArtikel"],
    mutationFn: (formData: FormData) => patchArtikel(id, formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-artikel" });
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

  const form: DataArtikelUpdateType = useForm<
    z.infer<typeof DataArtikelUpdateSchema>
  >({
    resolver: zodResolver(DataArtikelUpdateSchema),
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
    values: data
      ? {
          title: data.data.title,
          subTitle: data.data.subTitle,
          commentEnabled: data.data.commentEnabled,
          artikelContent: data.data.artikelContents,
          thumbnail: data.data.thumbnail as unknown as FileList,
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
          if (values.artikelContent[i].content instanceof FileList) {
            for (
              let j = 0;
              j < (values.artikelContent[i].content as FileList).length;
              j++
            ) {
              formDataArtikelContent.append(
                "content",
                (values.artikelContent[i] as { content: FileList }).content[j],
              );
            }
          } else {
            if (values.artikelContent[i].content) {
              formDataArtikelContent.append(
                "content",
                values.artikelContent[i].content as string,
              );
            }
          }
        }

        try {
          await postArtikelContentMutation({
            props: { id: id, formData: formDataArtikelContent },
          });
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataArtikel;
