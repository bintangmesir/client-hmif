import Ribbon from "@/components/costum/Ribbon";
import SectionLambangHimpunan from "@/features/about/_components/SectionLambangHimpunan";
import SectionTopAboutHimpunan from "@/features/about/_components/SectionTopAboutHimpunan";
import SectionTugasPokokHimpunan from "@/features/about/_components/SectionTugasPokokHimpunan";
import SectionVisiMisiHimpunana from "@/features/about/_components/SectionVisiMisiHimpunana";
import ClientLayout from "@/layouts/ClientLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/about")({
  component: () => AboutPage(),
});

function AboutPage() {
  return (
    <ClientLayout>
      <Ribbon props={{ direction: "left", text: "HMIF BEM FT-UMJ" }} />
      <SectionTopAboutHimpunan />
      <Ribbon props={{ direction: "right", text: "LAMBANG HIMPUNAN" }} />
      <SectionLambangHimpunan />
      <Ribbon props={{ direction: "left", text: "TUGAS POKOK" }} />
      <SectionTugasPokokHimpunan />
      <Ribbon props={{ direction: "left", text: "VISI & MISI" }} />
      <SectionVisiMisiHimpunana />
      <Ribbon props={{ direction: "right", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
}
