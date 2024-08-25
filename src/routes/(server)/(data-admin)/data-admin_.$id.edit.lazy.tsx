import UpdateDataAdmin from "@/features/data-admin/_pages/UpdateDataAdmin";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-admin)/data-admin/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataAdmin />
    </AdminLayout>
  ),
});
