import { useEffect } from "react";
import {
  AdminRoleEnum,
  useAuthUserContext,
  useCheckRole,
} from "@/context/auth-provider";
import CardUpdateDataAdmin from "../_components/CardUpdateDataAdmin";
import CardUpdatePasswordDataAdmin from "../_components/CardUpdatePasswordDataAdmin";
import CardResetPasswordDataAdmin from "../_components/CardResetPasswordDataAdmin";

const UpdateDataAdmin = () => {
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { checkRole, isAllowed } = useCheckRole();
  useEffect(() => {
    checkRole([
      AdminRoleEnum.super_admin,
      AdminRoleEnum.kadep_kominfo,
      AdminRoleEnum.kadep_prhp,
    ]);
  }, []);
  return (
    isAllowed && (
      <div className="container grid grid-cols-1 items-start justify-center gap-4 lg:grid-cols-2">
        <div className="flex h-full w-full items-start justify-center">
          <CardUpdateDataAdmin />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <CardUpdatePasswordDataAdmin />
          {role && role === AdminRoleEnum.super_admin ? (
            <CardResetPasswordDataAdmin />
          ) : null}
        </div>
      </div>
    )
  );
};

export default UpdateDataAdmin;
