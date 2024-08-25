import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import { CardDataYoutube } from "../_components/CardDataYoutube";

const IndexDataYoutube = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.kadep_kominfo, AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataYoutube />
      </div>
    )
  );
};

export default IndexDataYoutube;
