import { TypographyH1 } from "@/components/costum/Typhography";
import { AdminRoleEnum } from "@/hooks/useCheckRole";
import { getAccessToken, getActiveUser } from "@/services/auth";
import { AccessTokenType } from "@/utils/type";
import { Navigate } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import { getCookie } from "react-use-cookie";

export type AdminType = {
  id: string;
  name: string;
  email: string;
  role: AdminRoleEnum;
  fotoProfile: string | null;
  created_at: number;
  updated_at: number;
};

export type DataAdminActive =
  | {
      data: AdminType;
    }
  | undefined;

export const AuthUserContext = createContext<DataAdminActive>(undefined);

export function useAuthUserContext() {
  return useContext(AuthUserContext);
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = getCookie("accessToken");
  useQuery({
    queryKey: ["accessToken"],
    queryFn: () => getAccessToken(),
    enabled: accessToken === "",
  });

  const {
    data: dataUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["dataUser"],
    queryFn: () => {
      const decoded = jwtDecode<AccessTokenType>(accessToken);
      return getActiveUser(decoded.id);
    },
  });

  if (isError) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-dvh w-full items-center justify-center text-center">
        <TypographyH1>Validating Login Request...</TypographyH1>
      </div>
    );
  }

  return (
    <AuthUserContext.Provider value={dataUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthProvider;
