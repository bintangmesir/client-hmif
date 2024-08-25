import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardUpdateDataBuku from "../_components/CardUpdateDataBuku";

const UpdateDataBuku = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_prhp]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardUpdateDataBuku />
      </div>
    )
  );
};

export default UpdateDataBuku;
