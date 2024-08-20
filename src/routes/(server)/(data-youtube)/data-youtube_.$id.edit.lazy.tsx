import CardUpdateDataYoutube from "@/features/data-youtube/_components/CardUpdateDataYoutube";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-youtube)/data-youtube/$id/edit",
)({
  component: () => UpdateDataYoutube(),
});

function UpdateDataYoutube() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardUpdateDataYoutube />
      </div>
    </AdminLayout>
  );
}
