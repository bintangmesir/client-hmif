import UpdateDataPengurus from "@/features/data-pengurus/_pages/UpdateDataPengurus";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-pengurus)/data-pengurus/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataPengurus />
    </AdminLayout>
  ),
});
