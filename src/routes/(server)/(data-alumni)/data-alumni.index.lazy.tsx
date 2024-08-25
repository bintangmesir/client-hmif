import IndexDataAlumni from "@/features/data-alumni/_pages/IndexDataAlumni";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-alumni)/data-alumni/",
)({
  component: () => (
    <AdminLayout>
      <IndexDataAlumni />
    </AdminLayout>
  ),
});
