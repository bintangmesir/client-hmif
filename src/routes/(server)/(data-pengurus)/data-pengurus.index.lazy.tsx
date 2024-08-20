import { CardDataPengurus } from "@/features/data-pengurus/_components/CardDataPengurus";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-pengurus)/data-pengurus/",
)({
  component: () => IndexDataPengurus(),
});

function IndexDataPengurus() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataPengurus />
      </div>
    </AdminLayout>
  );
}
