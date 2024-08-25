import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardUpdateDataAlumni from "../_components/CardUpdateDataAlumni";

const UpdateDataAlumni = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_prhp]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardUpdateDataAlumni />
      </div>
    )
  );
};

export default UpdateDataAlumni;
