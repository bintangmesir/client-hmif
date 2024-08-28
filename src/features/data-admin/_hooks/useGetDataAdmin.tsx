import { getAdmin } from "@/services/admin";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataAdminType } from "../schema";

const useGetDataAdmin = () => {
  const [data, setData] = useState<DataAdminType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getAdmin"],
    queryFn: async () => getAdmin(offset),
    enabled: data.length < 1,
    onSuccess: (item) => {
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
    },
  });

  const {
    mutateAsync: getAdminMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getAdminByOffset"],
    mutationFn: getAdmin,
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
    getAdminMutation,
  };
};

export default useGetDataAdmin;
