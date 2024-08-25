import { useEffect } from "react";
import { AdminRoleEnum, useCheckRole } from "@/context/auth-provider";
import { CardDataArtikel } from "../_components/CardDataArtikel";

const IndexDataArtikel = () => {
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([AdminRoleEnum.kadep_kominfo, AdminRoleEnum.staff_kominfo]);
  }, []);
  return (
    isAllowed && (
      <div className="container flex items-center justify-center">
        <CardDataArtikel />
      </div>
    )
  );
};

export default IndexDataArtikel;
