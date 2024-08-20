import { getCsrf } from "@/services/csrf";
import { useQuery } from "react-query";
import { getCookie } from "react-use-cookie";

const useCsrfToken = () => {
  const csrf_token = getCookie("csrf_token");
  useQuery({
    queryKey: ["csrf_token"],
    queryFn: async () => {
      if (csrf_token !== "") return;
      getCsrf();
    },
  });

  return null;
};

export default useCsrfToken;
