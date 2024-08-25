import {
  AdminRoleEnum,
  useAuthUserContext,
  useCheckRole,
} from "@/context/auth-provider";
import { Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import DashboardSuperAdmin from "../_components/DashboardSuperAdmin";
import DashboardKadepKominfo from "../_components/DashboardKadepKominfo";
import DashboardStaffKominfo from "../_components/DashboardStaffKominfo";
import DashboardKadepPrhp from "../_components/DashboardKadepPrhp";
import DashboardStaffPrhp from "../_components/DashboardStaffPrhp";

const DashboardPage = () => {
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { checkRole } = useCheckRole();
  useEffect(() => {
    checkRole([]);
  }, []);

  if (role === AdminRoleEnum.super_admin) {
    return <DashboardSuperAdmin />;
  }

  if (role === AdminRoleEnum.kadep_kominfo) {
    return <DashboardKadepKominfo />;
  }

  if (role === AdminRoleEnum.staff_kominfo) {
    return <DashboardStaffKominfo />;
  }

  if (role === AdminRoleEnum.kadep_prhp) {
    return <DashboardKadepPrhp />;
  }

  if (role === AdminRoleEnum.staff_prhp) {
    return <DashboardStaffPrhp />;
  }

  return <Navigate to="/" />;
};

export default DashboardPage;
