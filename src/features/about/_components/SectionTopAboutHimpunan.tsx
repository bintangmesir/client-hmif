import { TypographyH1 } from "@/components/costum/Typhography";

const SectionTopAboutHimpunan = () => {
  const bgUrl =
    "https://images.unsplash.com/photo-1636955825879-488411f3277f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <section
      className="container flex min-h-dvh w-full flex-col items-center justify-center gap-4"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <img src="/images/LogoHMIF.png" className="h-auto w-full max-w-xs" />
      <TypographyH1 className="rounded-full bg-card px-6 py-2 text-center">
        HMIF BEM FT-UMJ
      </TypographyH1>
    </section>
  );
};

export default SectionTopAboutHimpunan;
