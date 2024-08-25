import IndexDataBarang from "@/features/data-barang/_pages/IndexDataBarang";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-barang)/data-barang/",
)({
  component: () => (
    <AdminLayout>
      <IndexDataBarang />
    </AdminLayout>
  ),
});
