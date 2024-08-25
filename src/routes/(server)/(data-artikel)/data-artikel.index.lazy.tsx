import IndexDataArtikel from "@/features/data-artikel/_pages/IndexDataArtikel";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-artikel)/data-artikel/",
)({
  component: () => (
    <AdminLayout>
      <IndexDataArtikel />
    </AdminLayout>
  ),
});
