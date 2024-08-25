import CreateDataAdmin from "@/features/data-admin/_pages/CreateDataAdmin";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-admin)/data-admin/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataAdmin />
    </AdminLayout>
  ),
});
