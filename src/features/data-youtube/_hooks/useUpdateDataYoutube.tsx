import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataYoutubeSchema } from "../schema";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "react-query";
import { getYoutubeById, patchYoutube } from "@/services/youtube";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type UpdateDataYoutubeType = UseFormReturn<
  z.infer<typeof DataYoutubeSchema>
>;

const useUpdateDataYoutube = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { data } = useQuery({
    queryKey: ["dataYoutubeById", { id: id }],
    queryFn: async () => getYoutubeById(id),
  });
  const { isLoading, mutateAsync: patchYoutubeMutation } = useMutation({
    mutationKey: ["patchYoutube"],
    mutationFn: (formData: FormData) => patchYoutube(id, formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-youtube" });
      }
    },
  });

  const form: UpdateDataYoutubeType = useForm<
    z.infer<typeof DataYoutubeSchema>
  >({
    resolver: zodResolver(DataYoutubeSchema),
    defaultValues: {
      judul: "",
      link: "",
    },
    values: data
      ? {
          judul: data.data.judul,
          link: data.data.link,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof DataYoutubeSchema>) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("link", values.link);

    try {
      await patchYoutubeMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit, id };
};

export default useUpdateDataYoutube;
