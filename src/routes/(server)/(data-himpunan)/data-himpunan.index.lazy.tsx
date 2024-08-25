import UpdateDataHimpunan from "@/features/data-himpunan/_pages/UpdateDataHimpunan";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-himpunan)/data-himpunan/",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataHimpunan />
    </AdminLayout>
  ),
});
