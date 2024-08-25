import AdminLayout from "@/layouts/AdminLayout";
import IndexDataPengurus from "@/features/data-pengurus/_pages/IndexDataPengurus";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-pengurus)/data-pengurus/",
)({
  component: () => (
    <AdminLayout>
      <IndexDataPengurus />
    </AdminLayout>
  ),
});
