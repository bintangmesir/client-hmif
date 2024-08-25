import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardCreateDataBuku from "../_components/CardCreateDataBuku";

const CreateDataBuku = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_prhp]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardCreateDataBuku />
      </div>
    )
  );
};

export default CreateDataBuku;
