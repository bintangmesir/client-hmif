import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import { useEffect } from "react";
import { CardDataAlumni } from "../_components/CardDataAlumni";

const IndexDataAlumni = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.kadep_prhp, AdminRoleEnum.staff_prhp]);
  }, []);

  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataAlumni />
      </div>
    )
  );
};

export default IndexDataAlumni;
