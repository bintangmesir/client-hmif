import CreateDataPengurus from "@/features/data-pengurus/_pages/CreateDataPengurus";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-pengurus)/data-pengurus/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataPengurus />
    </AdminLayout>
  ),
});
