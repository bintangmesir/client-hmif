import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import CardUpdateDataArtikel from "../_components/CardUpdateDataArtikel";

const UpdateDataArtikel = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardUpdateDataArtikel />
      </div>
    )
  );
};

export default UpdateDataArtikel;
