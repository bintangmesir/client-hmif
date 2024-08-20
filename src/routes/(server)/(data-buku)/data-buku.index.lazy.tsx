import { CardDataBuku } from "@/features/data-buku/_components/CardDataBuku";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/(data-buku)/data-buku/")({
  component: () => IndexDataBuku(),
});

function IndexDataBuku() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataBuku />
      </div>
    </AdminLayout>
  );
}
