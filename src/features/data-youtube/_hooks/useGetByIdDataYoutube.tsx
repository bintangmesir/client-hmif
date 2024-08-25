import { getYoutubeById } from "@/services/youtube";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "react-query";

const useGetDataByIdYoutube = () => {
  const { id }: { id: string } = useParams({ strict: false });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getYoutubeById", { id }],
    queryFn: async () => {
      return getYoutubeById(id);
    },
  });
  return { data, isLoading, isError };
};

export default useGetDataByIdYoutube;
