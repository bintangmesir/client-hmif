import { TypographyH1 } from "@/components/costum/Typhography";
import { getAccessToken, getActiveUser } from "@/services/auth";
import { AccessTokenType } from "@/utils/type";
import { Navigate, useLocation, useNavigate } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCookie } from "react-use-cookie";

export enum AdminRoleEnum {
  super_admin = "super_admin",
  kadep_kominfo = "kadep_kominfo",
  staff_kominfo = "staff_kominfo",
  kadep_prhp = "kadep_prhp",
  staff_prhp = "staff_prhp",
}

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
export const CheckRoleContext = createContext<{
  checkRole: (roleAllowed: AdminRoleEnum[]) => Promise<void> | undefined;
  isAllowed: boolean;
}>({ checkRole: () => undefined, isAllowed: false });

export function useAuthUserContext() {
  return useContext(AuthUserContext);
}

export function useCheckRole() {
  return useContext(CheckRoleContext);
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const accessToken = getCookie("accessToken");
  const [isAllowed, setIsAllowed] = useState(false);
  useQuery({
    queryKey: ["accessToken"],
    queryFn: async () => getAccessToken(),
    refetchInterval: 3500000,
    onSuccess: (item) => {
      if (item.status === "error") {
        return navigate({ to: "/" });
      }
    },
  });

  const {
    data: authData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["authData"],
    queryFn: async () => {
      const decoded = jwtDecode<AccessTokenType>(accessToken);
      return getActiveUser(decoded.id);
    },
    enabled: accessToken !== "",
  });

  const checkRole = (roleAllowed: AdminRoleEnum[]) => {
    setIsAllowed(false);
    if (roleAllowed.length && authData) {
      const isValid = roleAllowed.includes(authData.data.role);
      if (!isValid) {
        return navigate({ to: "/dashboard" });
      } else {
        setIsAllowed(true);
      }
    }
    setIsAllowed(true);
  };

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
    <AuthUserContext.Provider value={authData}>
      <CheckRoleContext.Provider value={{ checkRole, isAllowed }}>
        {authData && children}
      </CheckRoleContext.Provider>
    </AuthUserContext.Provider>
  );
};

export default AuthProvider;
