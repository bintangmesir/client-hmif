import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import { useEffect } from "react";
import { CardDataBarang } from "../_components/CardDataBarang";

const IndexDataBarang = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.kadep_prhp, AdminRoleEnum.staff_prhp]);
  }, []);

  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataBarang />
      </div>
    )
  );
};

export default IndexDataBarang;
