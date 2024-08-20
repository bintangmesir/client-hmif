import ClientLayout from "@/layouts/ClientLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/artikel")({
  component: () => ArtikelPage(),
});

function ArtikelPage() {
  return (
    <ClientLayout>
      <div>Hello /_client/artikel!</div>
    </ClientLayout>
  );
}
