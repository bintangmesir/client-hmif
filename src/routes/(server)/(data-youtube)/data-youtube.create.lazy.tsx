import CardCreateDataYoutube from "@/features/data-youtube/_components/CardCreateDataYoutube";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-youtube)/data-youtube/create",
)({
  component: () => CreateDataYoutube(),
});

function CreateDataYoutube() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataYoutube />
      </div>
    </AdminLayout>
  );
}
