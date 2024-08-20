import { CardDataArtikel } from "@/features/data-artikel/_components/CardDataArtikel";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-artikel)/data-artikel/",
)({
  component: () => IndexDataArtikel(),
});

function IndexDataArtikel() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataArtikel />
      </div>
    </AdminLayout>
  );
}
