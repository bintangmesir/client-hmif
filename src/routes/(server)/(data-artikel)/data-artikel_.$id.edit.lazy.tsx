import UpdateDataArtikel from "@/features/data-artikel/_pages/UpdateDataArtikel";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-artikel)/data-artikel/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataArtikel />
    </AdminLayout>
  ),
});
