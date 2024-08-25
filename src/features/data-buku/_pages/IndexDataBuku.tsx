import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import { useEffect } from "react";
import { CardDataBuku } from "../_components/CardDataBuku";

const IndexDataBuku = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.kadep_prhp, AdminRoleEnum.staff_prhp]);
  }, []);

  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataBuku />
      </div>
    )
  );
};

export default IndexDataBuku;
