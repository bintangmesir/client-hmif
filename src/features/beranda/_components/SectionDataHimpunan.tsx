import { useQuery } from "react-query";
import { getHimpunan } from "@/services/himpunan";
import { splitStringToArray } from "@/utils/stringToArray";
import NumberTicker from "@/components/magicui/number-ticker";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import { TypographyH1, TypographyList } from "@/components/costum/Typhography";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Marquee from "@/components/magicui/marquee";

const SectionDataHimpunan = () => {
  const { data } = useQuery({
    queryKey: ["dataHimpunan"],
    queryFn: async () => getHimpunan(),
  });
  return (
    <div className="container flex w-full flex-col items-center justify-center gap-8">
      <div className="grid w-full grid-cols-1 items-center justify-center gap-8 md:grid-cols-2">
        <div className="flex min-h-[300px] w-full items-center justify-center">
          <TypographyH1 className="text-center">
            <NumberTicker value={data?.data.jumlahDepartemen ?? 0} /> Departemen
          </TypographyH1>
        </div>
        <div className="flex min-h-[300px] w-full items-center justify-center gap-4">
          <TypographyH1 className="text-center">
            <NumberTicker value={data?.data.jumlahPengurus ?? 0} /> Pengurus
          </TypographyH1>
        </div>
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4">
          <TypographyH1 className="text-center">
            <NumberTicker
              value={
                data ? splitStringToArray(data?.data.namaProker).length : 0
              }
            />
            Program Kerja
          </TypographyH1>
          <TypographyList
            props={splitStringToArray(data?.data.namaProker ?? "")}
          />
        </div>
        <div className="flex min-h-[300px] w-full items-center justify-center">
          <TypographyH1 className="text-center">
            <NumberTicker value={data?.data.jumlahMahasiswa ?? 0} /> Mahasiswa
            Aktif
          </TypographyH1>
        </div>
      </div>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {data &&
            data.data.galeriMahasiswa &&
            splitStringToArray(data.data.galeriMahasiswa).map((item, id) => (
              <div key={id} className="flex w-full items-center justify-center">
                <Zoom>
                  <img
                    src={`${VITE_APP_FILE_SERVER}/himpunan/${data.data.id}/${item}`}
                    alt={item}
                    className="h-[500px] w-full"
                  />
                </Zoom>
              </div>
            ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      </div>
    </div>
  );
};

export default SectionDataHimpunan;
