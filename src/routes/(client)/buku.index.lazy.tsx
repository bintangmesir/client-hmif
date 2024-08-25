import BukuPage from "@/features/buku/_components/BukuPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/buku/")({
  component: () => BukuPage(),
});
