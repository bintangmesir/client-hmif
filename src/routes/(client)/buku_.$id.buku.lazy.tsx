import Ribbon from "@/components/costum/Ribbon";
import CardDataBukuByIdClient from "@/features/data-buku/_components/CardDataBukuByIdClient";
import CardDataBukuClient from "@/features/data-buku/_components/CardDataBukuClient";
import ClientLayout from "@/layouts/ClientLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/buku/$id/buku")({
  component: () => BukuByIdPage(),
});

function BukuByIdPage() {
  return (
    <ClientLayout>
      <Ribbon
        props={{ direction: "left", text: "PERPUSTAKAAN HMIF BEM FT-UMJ" }}
      />
      <CardDataBukuByIdClient />
      <Ribbon props={{ direction: "right", text: "BUKU-BUKU LAINNYA" }} />
      <CardDataBukuClient />
      <Ribbon props={{ direction: "left", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
}
