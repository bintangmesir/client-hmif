import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardCreateDataArtikel from "../_components/CardCreateDataArtikel";

const CreateDataArtikel = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardCreateDataArtikel />
      </div>
    )
  );
};

export default CreateDataArtikel;
