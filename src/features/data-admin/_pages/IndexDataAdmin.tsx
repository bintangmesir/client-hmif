import { useEffect } from "react";
import { CardDataAdmin } from "../_components/CardDataAdmin";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";

export const IndexDataAdmin = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([
      AdminRoleEnum.super_admin,
      AdminRoleEnum.kadep_kominfo,
      AdminRoleEnum.kadep_prhp,
    ]);
  }, []);

  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataAdmin />
      </div>
    )
  );
};
