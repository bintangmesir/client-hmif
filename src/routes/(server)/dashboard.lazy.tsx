import DashboardPage from "@/features/dashboard/_pages/DashboardPage";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/dashboard")({
  component: () => (
    <AdminLayout>
      <DashboardPage />
    </AdminLayout>
  ),
});
