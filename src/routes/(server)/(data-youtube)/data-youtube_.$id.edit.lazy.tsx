import AdminLayout from "@/layouts/AdminLayout";
import UpdateDataYoutube from "@/features/data-youtube/_pages/UpdateDataYoutube";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-youtube)/data-youtube/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataYoutube />
    </AdminLayout>
  ),
});
