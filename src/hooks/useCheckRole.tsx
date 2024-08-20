import { useAuthUserContext } from "@/context/auth-provider";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const enum AdminRoleEnum {
  super_admin = "super_admin",
  kadep_kominfo = "kadep_kominfo",
  staff_kominfo = "staff_kominfo",
  kadep_prhp = "kadep_prhp",
  staff_prhp = "staff_prhp",
}

const useCheckRole = () => {
  const navigate = useNavigate();
  const authData = useAuthUserContext();
  const [rolesActive, setRoleActive] = useState<AdminRoleEnum[]>([]);
  const [role, setRole] = useState<AdminRoleEnum | undefined>();

  useEffect(() => {
    if (authData) {
      setRole(authData.role);
    }
  }, [authData]);

  useEffect(() => {
    const checkRole = rolesActive.filter((roleActive) => roleActive === role);

    if (checkRole.length < 1) {
      navigate({ to: "/dashboard" });
    }
  }, [role]);

  return { role, rolesActive, setRoleActive };
};

export default useCheckRole;
