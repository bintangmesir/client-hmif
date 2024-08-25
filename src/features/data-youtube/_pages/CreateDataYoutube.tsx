import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardCreateDataYoutube from "../_components/CardCreateDataYoutube";

const CreateDataYoutube = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardCreateDataYoutube />
      </div>
    )
  );
};

export default CreateDataYoutube;
