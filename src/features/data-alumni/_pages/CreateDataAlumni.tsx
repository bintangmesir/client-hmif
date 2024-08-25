import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardCreateDataAlumni from "../_components/CardCreateDataAlumni";

const CreateDataAlumni = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_prhp]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardCreateDataAlumni />
      </div>
    )
  );
};

export default CreateDataAlumni;
