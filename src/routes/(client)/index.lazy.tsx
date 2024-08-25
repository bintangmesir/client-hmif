import { createLazyFileRoute } from "@tanstack/react-router";
import ClientLayout from "@/layouts/ClientLayout";
import Ribbon from "@/components/costum/Ribbon";
import CardDataPengurusClient from "@/features/data-pengurus/_components/CardDataPengurusClient";
import CardHero from "@/features/beranda/_components/CardHero";
import SectionTugasPokokHimpunan from "@/features/beranda/_components/SectionTugasPokokHimpunan";
import SectionLambangHimpunan from "@/features/beranda/_components/SectionLambangHimpunan";
import SectionVisiMisiHimpunanan from "@/features/beranda/_components/SectionVisiMisiHimpunana";
import SectionWeAreHmif from "@/features/beranda/_components/SectionWeAreHmif";
import SectionDataHimpunan from "@/features/beranda/_components/SectionDataHimpunan";

export const Route = createLazyFileRoute("/(client)/")({
  component: () => BerandaPage(),
});

function BerandaPage() {
  return (
    <ClientLayout>
      <CardHero />
      <Ribbon
        props={{
          direction: "left",
          text: "UNGGUL DALAM IPTEK KOKOH DALAM IMTAQ",
        }}
      />
      <SectionDataHimpunan />
      <Ribbon
        props={{
          direction: "right",
          text: "BADAN PENGURUS HARIAN HMIF BEM FT-UMJ",
        }}
      />
      <CardDataPengurusClient />
      <Ribbon
        props={{
          direction: "left",
          text: "TUGAS POKOK HMIF BEM FT-UMJ",
        }}
      />
      <SectionTugasPokokHimpunan />
      <Ribbon props={{ direction: "right", text: "LAMBANG HIMPUNAN" }} />
      <SectionLambangHimpunan />
      <Ribbon props={{ direction: "left", text: "VISI & MISI" }} />
      <SectionVisiMisiHimpunanan />
      <Ribbon props={{ direction: "right", text: "WE ARE HMIF" }} />
      <SectionWeAreHmif />
      <Ribbon props={{ direction: "left", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
}
