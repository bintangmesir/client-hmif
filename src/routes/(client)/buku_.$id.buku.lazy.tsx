import BukuByIdPage from "@/features/buku/_components/BukuByIdPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/buku/$id/buku")({
  component: () => BukuByIdPage(),
});
