import CardUpdateDataBuku from "@/features/data-buku/_components/CardUpdateDataBuku";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-buku)/data-buku/$id/edit",
)({
  component: () => UpdateDataBuku(),
});

function UpdateDataBuku() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardUpdateDataBuku />
      </div>
    </AdminLayout>
  );
}
