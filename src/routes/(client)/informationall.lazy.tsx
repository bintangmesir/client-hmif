import InformationallPage from "@/features/informationall/_components/InformationallPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/informationall")({
  component: () => InformationallPage(),
});
