import AdminLayout from "@/layouts/AdminLayout";
import CreateDataArtikel from "@/features/data-artikel/_pages/CreateDataArtikel";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-artikel)/data-artikel/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataArtikel />
    </AdminLayout>
  ),
});
