import Ribbon from "@/components/costum/Ribbon";
import CardDataBukuClient from "@/features/data-buku/_components/CardDataBukuClient";
import ClientLayout from "@/layouts/ClientLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/buku/")({
  component: () => BukuPage(),
});

function BukuPage() {
  return (
    <ClientLayout>
      <Ribbon
        props={{ direction: "right", text: "PERPUSTAKAAN HMIF BEM FT-UMJ" }}
      />
      <CardDataBukuClient />
      <Ribbon props={{ direction: "left", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
}
