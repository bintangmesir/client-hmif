import { createLazyFileRoute } from "@tanstack/react-router";
import ClientLayout from "@/layouts/ClientLayout";

export const Route = createLazyFileRoute("/(client)/")({
  component: () => BerandaPage(),
});

function BerandaPage() {
  return (
    <ClientLayout>
      <div>Hello /_client/!</div>
    </ClientLayout>
  );
}
