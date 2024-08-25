import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardCreateDataPengurus from "../_components/CardCreateDataPengurus";

const CreateDataPengurus = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardCreateDataPengurus />
      </div>
    )
  );
};

export default CreateDataPengurus;
