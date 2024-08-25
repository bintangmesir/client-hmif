import AdminLayout from "@/layouts/AdminLayout";
import IndexDataYoutube from "@/features/data-youtube/_pages/IndexDataYoutube";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-youtube)/data-youtube/",
)({
  component: () => (
    <AdminLayout>
      <IndexDataYoutube />
    </AdminLayout>
  ),
});
