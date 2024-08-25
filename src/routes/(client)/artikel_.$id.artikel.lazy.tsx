import Ribbon from "@/components/costum/Ribbon";
import CardDataArtikelClient from "@/features/data-artikel/_components/CardDataArtikelClient";
import CardDataArtikelByIdClient from "@/features/data-artikel/_components/CardDataArtikelByIdClient";
import ClientLayout from "@/layouts/ClientLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/artikel/$id/artikel")({
  component: () => ArtikelGetByIdPage(),
});

function ArtikelGetByIdPage() {
  return (
    <ClientLayout>
      <Ribbon props={{ direction: "left", text: "ARTIKEL HMIF BEM FT-UMJ" }} />
      <CardDataArtikelByIdClient />
      <Ribbon props={{ direction: "right", text: "ARTIKEL LAINNYA" }} />
      <CardDataArtikelClient />
      <Ribbon props={{ direction: "left", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
}
