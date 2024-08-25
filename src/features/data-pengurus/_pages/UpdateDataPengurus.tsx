import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardUpdateDataPengurus from "../_components/CardUpdateDataPengurus";

const UpdateDataPengurus = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardUpdateDataPengurus />
      </div>
    )
  );
};

export default UpdateDataPengurus;
