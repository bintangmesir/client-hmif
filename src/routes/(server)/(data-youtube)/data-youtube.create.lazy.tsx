import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";
import CreateDataYoutube from "@/features/data-youtube/_pages/CreateDataYoutube";

export const Route = createLazyFileRoute(
  "/(server)/(data-youtube)/data-youtube/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataYoutube />
    </AdminLayout>
  ),
});
