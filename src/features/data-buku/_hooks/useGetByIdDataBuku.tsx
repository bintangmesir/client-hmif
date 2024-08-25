import { getBukuById } from "@/services/buku";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "react-query";

const useGetDataByIdBuku = () => {
  const { id }: { id: string } = useParams({ strict: false });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getBukuById", { id }],
    queryFn: async () => {
      return getBukuById(id);
    },
  });
  return { data, isLoading, isError };
};

export default useGetDataByIdBuku;
