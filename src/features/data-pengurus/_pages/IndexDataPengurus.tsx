import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import { CardDataPengurus } from "../_components/CardDataPengurus";

const IndexDataPengurus = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.kadep_kominfo, AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataPengurus />
      </div>
    )
  );
};

export default IndexDataPengurus;
