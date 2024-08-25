import CreateDataAlumni from "@/features/data-artikel/_pages/CreateDataArtikel";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-alumni)/data-alumni/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataAlumni />
    </AdminLayout>
  ),
});
