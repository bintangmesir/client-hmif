import ClientLayout from "@/layouts/ClientLayout";
import CardHero from "../_components/CardHero";
import Ribbon from "@/components/costum/Ribbon";
import SectionDataHimpunan from "../_components/SectionDataHimpunan";
import CardDataPengurusClient from "@/features/data-pengurus/_components/CardDataPengurusClient";
import SectionTugasPokokHimpunan from "../_components/SectionTugasPokokHimpunan";
import SectionLambangHimpunan from "../_components/SectionLambangHimpunan";
import SectionWeAreHmif from "../_components/SectionWeAreHmif";
import SectionVisiMisiHimpunan from "../_components/SectionVisiMisiHimpunan";
import CardDataArtikelClient from "@/features/data-artikel/_components/CardDataArtikelClient";

const BerandaPage = () => {
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
      <SectionVisiMisiHimpunan />
      <Ribbon props={{ direction: "right", text: "WE ARE HMIF" }} />
      <SectionWeAreHmif />
      <Ribbon props={{ direction: "left", text: "ARTIKEL TERBARU" }} />
      <CardDataArtikelClient />
      <Ribbon props={{ direction: "right", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
};

export default BerandaPage;
