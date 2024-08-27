import { useState } from "react";
import useGetDataByIdArtikel from "../_hooks/useGetByIdDataArtikel";
import {
  TypographyBlockquote,
  TypographyH3,
  TypographyP,
} from "@/components/costum/Typhography";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck, EyeIcon } from "lucide-react";
import { ArtikelContentSubTipeEnum, ArtikelContentTipeEnum } from "../schema";
import CaraouselImgPreview from "@/components/costum/CarouselImgPreview";
import { splitStringToArray } from "@/utils/stringToArray";
import Editor from "@monaco-editor/react";
import { formatNumber } from "@/utils/formatNumber";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CardDataArtikelByIdClient = () => {
  const { data, isError, isLoading } = useGetDataByIdArtikel();
  const [isClipboardActive, setIsClipboardActive] = useState(false);

  // Clipboard action handler
  const handleClipboardAction = (content: string | undefined) => {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        setIsClipboardActive(true);
        setTimeout(() => {
          setIsClipboardActive(false);
        }, 1000); // Show checkmark for 1 second
      });
    }
  };

  if (isError) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-center">
        <TypographyH3>Oops! Something Wrong...</TypographyH3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-center">
        <TypographyH3>Loading...</TypographyH3>
      </div>
    );
  }
  return (
    data && (
      <div className="container flex w-full items-start justify-center">
        <Card className="w-full max-w-3xl space-y-8 border-2 border-primary">
          <CardHeader>
            <CardTitle>{data.data.title}</CardTitle>
            <CardDescription>{data.data.subTitle}</CardDescription>
            <Zoom>
              <img
                src={
                  data.data.thumbnail
                    ? `${VITE_APP_FILE_SERVER}/artikel/${data.data.id}/${data.data?.thumbnail}`
                    : `https://ui-avatars.com/api/?name=${data.data.thumbnail}`
                }
                className="pt-4"
                alt={data.data.thumbnail ?? ""}
              />
            </Zoom>

            <div className="flex flex-col items-start justify-center gap-4 pt-4 sm:flex-row sm:items-center sm:justify-start">
              <Avatar>
                <AvatarImage
                  src={
                    data.data.admins[0].fotoProfile
                      ? `${import.meta.env.VITE_APP_FILE_SERVER}/admin/${data.data.admins[0].id}/${data.data.admins[0].fotoProfile}`
                      : `https://ui-avatars.com/api/?name=${data.data.admins[0].name}`
                  }
                  alt={data.data.admins[0].name}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-center">
                <TypographyP>{data.data.admins[0].name}</TypographyP>
                <TypographyP>{data.data.admins[0].email}</TypographyP>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center justify-center gap-1.5">
                <span className="flex items-center justify-center gap-2">
                  <EyeIcon /> {formatNumber(data.data.view)}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                {isClipboardActive ? (
                  <Button
                    className="flex items-center gap-2"
                    size={"sm"}
                    variant={"ghost"}
                  >
                    coppied
                    <ClipboardCheck className="cursor-pointer" />
                  </Button>
                ) : (
                  <Button variant={"ghost"} size={"sm"}>
                    <Clipboard
                      onClick={() =>
                        handleClipboardAction(window.location.href)
                      }
                    />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {data.data.artikelContents.map((content, id) => {
              if (content.tipe === ArtikelContentTipeEnum.subTitle) {
                return (
                  <TypographyH3 key={id}>
                    {content.content as string}
                  </TypographyH3>
                );
              }

              if (content.tipe === ArtikelContentTipeEnum.blockquote) {
                return (
                  <TypographyBlockquote key={id}>
                    {content.content as string}
                  </TypographyBlockquote>
                );
              }

              if (content.tipe === ArtikelContentTipeEnum.code) {
                return (
                  <div
                    className="flex w-full flex-col border-2 border-primary"
                    key={id}
                  >
                    <div className="flex w-full items-center justify-between px-3 py-2">
                      {content.subTipe === ArtikelContentSubTipeEnum.r
                        ? "R"
                        : content.subTipe ===
                            ArtikelContentSubTipeEnum.cPlusPlus
                          ? "c++"
                          : content.subTipe === ArtikelContentSubTipeEnum.cSharp
                            ? "c#"
                            : content.subTipe}
                      {isClipboardActive ? (
                        <Button
                          className="flex items-center gap-2"
                          size={"sm"}
                          variant={"ghost"}
                        >
                          coppied
                          <ClipboardCheck className="cursor-pointer" />
                        </Button>
                      ) : (
                        <Button variant={"ghost"} size={"sm"}>
                          <Clipboard
                            onClick={() =>
                              handleClipboardAction(content.content as string)
                            }
                          />
                        </Button>
                      )}
                    </div>
                    <Editor
                      height="auto"
                      language={content.subTipe}
                      theme="vs-dark"
                      value={content.content as string}
                      className="h-[350px] w-full"
                      options={{
                        fontSize: 12,
                        padding: { top: 12, bottom: 12 },
                        formatOnType: true,
                        autoClosingBrackets: "always",
                        minimap: { autohide: true },
                      }}
                    />
                  </div>
                );
              }
              if (content.tipe === ArtikelContentTipeEnum.image) {
                return (
                  <div
                    className="flex w-full items-center justify-center px-8"
                    key={id}
                  >
                    {(content.content as unknown as string) !== "" ? (
                      <CaraouselImgPreview
                        props={{
                          path: `${VITE_APP_FILE_SERVER}/artikel-content/${data.data.id}`,
                          data: splitStringToArray(
                            content.content as unknown as string,
                          ),
                        }}
                      />
                    ) : null}
                  </div>
                );
              }

              return (
                <TypographyP key={id}>{content.content as string}</TypographyP>
              );
            })}
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default CardDataArtikelByIdClient;
