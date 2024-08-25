import { useQuery } from "react-query";
import { useParams } from "@tanstack/react-router";
import { getInstagramById } from "@/services/instagram";

const useGetDataByIdInstagram = () => {
  const { id }: { id: string } = useParams({ strict: false });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getInstagramById", { id }],
    queryFn: async () => {
      return getInstagramById(id);
    },
  });
  return { data, isLoading, isError };
};

export default useGetDataByIdInstagram;
