import { getAlumni } from "@/services/alumni";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataAlumniType } from "../schema";

const useGetDataAlumni = () => {
  const [data, setData] = useState<DataAlumniType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getAlumni"],
    queryFn: async () => getAlumni(offset),
    enabled: data.length < 1,
    onSuccess: (item) => {
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
    },
  });

  const {
    mutateAsync: getAlumniMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getAlumniByOffset"],
    mutationFn: getAlumni,
    onSuccess: (item) => {
      setData((data) => [...data, ...item.data]);
      setOffset(item.offset);
    },
  });

  return {
    data,
    offset,
    length,
    isLoading,
    isError,
    firstIsLoading,
    firstIsError,
    getAlumniMutation,
  };
};

export default useGetDataAlumni;
