import { CardDataYoutube } from "@/features/data-youtube/_components/CardDataYoutube";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-youtube)/data-youtube/",
)({
  component: () => IndexDataYoutube(),
});

function IndexDataYoutube() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataYoutube />
      </div>
    </AdminLayout>
  );
}
