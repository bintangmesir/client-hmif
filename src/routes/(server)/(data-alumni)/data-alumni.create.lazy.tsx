import CreateDataAlumni from "@/features/data-alumni/_pages/CreateDataAlumni";
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
