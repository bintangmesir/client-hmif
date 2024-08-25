import { getArtikelById } from "@/services/artikel";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "react-query";

const useGetDataByIdArtikel = () => {
  const { id }: { id: string } = useParams({ strict: false });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getArtikelById", { id }],
    queryFn: async () => {
      return getArtikelById(id);
    },
  });
  return { data, isLoading, isError };
};

export default useGetDataByIdArtikel;
