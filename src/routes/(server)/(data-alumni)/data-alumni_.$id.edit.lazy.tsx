import UpdateDataAlumni from "@/features/data-alumni/_pages/UpdateDataArtikel";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-alumni)/data-alumni/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataAlumni />
    </AdminLayout>
  ),
});
