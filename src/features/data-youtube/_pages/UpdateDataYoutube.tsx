import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardUpdateDataYoutube from "../_components/CardUpdateDataYoutube";

const UpdateDataYoutube = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardUpdateDataYoutube />
      </div>
    )
  );
};

export default UpdateDataYoutube;
