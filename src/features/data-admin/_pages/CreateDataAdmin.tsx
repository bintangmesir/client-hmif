import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardCreateDataAdmin from "../_components/CardCreateDataAdmin";
import { useEffect } from "react";

const CreateDataAdmin = () => {
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
        <CardCreateDataAdmin />
      </div>
    )
  );
};

export default CreateDataAdmin;
