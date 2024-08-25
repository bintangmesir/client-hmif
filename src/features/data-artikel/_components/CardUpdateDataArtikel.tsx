import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Loader, Minus, Plus } from "lucide-react";
import FormInput from "@/components/costum/FormInput";
import useUpdateDataArtikel from "../_hooks/useUpdateDataArtikel";
import useCsrfToken from "@/hooks/useCsrfToken";
import FormFile from "@/components/costum/FormFile";
import FormSelect from "@/components/costum/FormSelect";
import { ArtikelContentSubTipeEnum, ArtikelContentTipeEnum } from "../schema";
import FormTextarea from "@/components/costum/FormTextarea";
import { TypographyH3 } from "@/components/costum/Typhography";
import { useFieldArray } from "react-hook-form";
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CardUpdateDataArtikel = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit, id } = useUpdateDataArtikel();
  const { fields, append, remove, move, update } = useFieldArray({
    name: "artikelContent",
    control: form.control,
  });

  const handleAddContent = () => {
    const newArtikelContent: {
      tipe: ArtikelContentTipeEnum.description;
      subTipe: ArtikelContentSubTipeEnum.default;
      content: string;
    } = {
      tipe: ArtikelContentTipeEnum.description,
      subTipe: ArtikelContentSubTipeEnum.default,
      content: "",
    };

    append(newArtikelContent);
  };

  const handleRemoveContent = (index: number) => {
    remove(index);
  };

  const handleMoveItem = (index: number, direction: number) => {
    move(index, index + direction);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Data Artikel</CardTitle>
            <CardDescription>Form for update data artikel</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"title"}
              inputProps={{ placeholder: "Judul artikel", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"subTitle"}
              inputProps={{ placeholder: "Sub judul artikel", type: "text" }}
            />
            <FormSelect
              form={form.control}
              name={"commentEnabled"}
              values={["true", "false"]}
              placeholder="Select perizinan comment"
            />
            <FormFile
              form={form.control}
              name={"thumbnail"}
              imgPath={`${import.meta.env.VITE_APP_FILE_SERVER}/artikel/${id}`}
            />
            {fields.map((content, index) => {
              return (
                <div
                  className="flex w-full flex-col gap-4 pt-4"
                  key={content.id}
                >
                  <TypographyH3>Artikel Content #{index + 1}</TypographyH3>
                  <FormField
                    control={form.control}
                    name={`artikelContent.${index}.tipe`}
                    render={({ field }) => (
                      <FormItem className="pb-1">
                        <FormLabel className="capitalize">
                          {stringTransformToWhiteSpace(field.name)}
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const newValue = value as
                              | "sub_title"
                              | "description"
                              | "image"
                              | "code"
                              | "blockquote";

                            if (newValue === "code") {
                              update(index, {
                                tipe: newValue,
                                subTipe: "php",
                                content: "",
                              });
                            } else if (newValue === "image") {
                              update(index, {
                                tipe: newValue,
                                subTipe: "default",
                                content: null,
                              });
                            } else {
                              update(index, {
                                tipe: newValue,
                                subTipe: "default",
                                content: "",
                              });
                            }
                          }}
                          defaultValue={field.value}
                          value={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Select tipe content"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "sub_title",
                              "description",
                              "image",
                              "code",
                              "blockquote",
                            ].map((value, id) => (
                              <SelectItem
                                className="capitalize"
                                value={value}
                                key={id}
                              >
                                {stringTransformToWhiteSpace(value)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {content.tipe === ArtikelContentTipeEnum.image ? (
                    <FormFile
                      form={form.control}
                      name={`artikelContent.${index}.content`}
                      imgPath={`${import.meta.env.VITE_APP_FILE_SERVER}/artikel-content/${id}`}
                    />
                  ) : content.tipe === ArtikelContentTipeEnum.description ||
                    content.tipe === ArtikelContentTipeEnum.code ? (
                    <FormTextarea
                      form={form.control}
                      name={`artikelContent.${index}.content`}
                      textareaProps={{ placeholder: "example" }}
                    />
                  ) : (
                    <FormInput
                      form={form.control}
                      name={`artikelContent.${index}.content`}
                      inputProps={{
                        placeholder: "example",
                        type: "text",
                      }}
                    />
                  )}
                  {content.tipe === "code" ? (
                    <FormSelect
                      form={form.control}
                      name={`artikelContent.${index}.subTipe`}
                      values={[
                        "default",
                        "javascript",
                        "typescript",
                        "html",
                        "css",
                        "python",
                        "java",
                        "cpp",
                        "csharp",
                        "ruby",
                        "php",
                        "go",
                        "json",
                        "scss",
                        "perl",
                        "r",
                        "lua",
                      ]}
                      placeholder="Select sub tipe content"
                    />
                  ) : null}
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center justify-center gap-2">
                      {index > 0 ? (
                        <Button
                          type="button"
                          size={"icon"}
                          onClick={() => handleMoveItem(index, -1)}
                        >
                          <ArrowUp />
                        </Button>
                      ) : null}
                      {index !== fields.length - 1 ? (
                        <Button
                          type="button"
                          size={"icon"}
                          onClick={() => handleMoveItem(index, 1)}
                        >
                          <ArrowDown />
                        </Button>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {fields.length < 20 ? (
                        <Button
                          type="button"
                          size={"icon"}
                          onClick={handleAddContent}
                        >
                          <Plus />
                        </Button>
                      ) : null}
                      {fields.length > 1 ? (
                        <Button
                          type="button"
                          size={"icon"}
                          onClick={() => handleRemoveContent(index)}
                        >
                          <Minus />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!isLoading ? (
              <Button type="submit" className="w-full">
                Update Data
              </Button>
            ) : (
              <Button
                className="flex w-full items-center justify-center"
                disabled
              >
                <Loader className="mr-2 animate-spin" /> Loading
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CardUpdateDataArtikel;
