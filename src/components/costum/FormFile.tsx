import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import { Input, InputProps } from "../ui/input";
import { useState } from "react";
import CaraouselImgPreview from "./CarouselImgPreview";
import { splitStringToArray } from "@/utils/stringToArray";

type FormFileProps<T extends FieldValues> = {
  form: Control<T>;
  name: FieldPath<T>;
  description?: string;
  imgPath?: string;
  imgDatas?: string[];
  showPreviewImage?: boolean;
  inputProps?: InputProps;
};

const FormFile = <T extends FieldValues>({
  form,
  name,
  description,
  imgPath,
  showPreviewImage = true,
  inputProps,
}: FormFileProps<T>) => {
  const [imgDataUploaded, setImgDataUploaded] = useState<string[]>([]);
  return (
    <FormField
      control={form}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="pb-1">
            <FormLabel className="capitalize">
              {stringTransformToWhiteSpace(field.name)}
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                className="dark:file:text-white"
                accept="image/*,application/*"
                multiple={true}
                onChange={(event) => {
                  setImgDataUploaded([]);
                  const dataTransfer = new DataTransfer();
                  Array.from(event.target.files!).forEach((image) => {
                    setImgDataUploaded((prevVals) => [
                      ...prevVals,
                      URL.createObjectURL(image),
                    ]);
                    dataTransfer.items.add(image);
                  });
                  const newFiles = dataTransfer.files;
                  field.onChange(newFiles);
                }}
                {...inputProps}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
            {showPreviewImage ? (
              <>
                {imgDataUploaded.length > 0 ? (
                  <div className="container">
                    <CaraouselImgPreview props={{ data: imgDataUploaded }} />
                  </div>
                ) : imgPath && field.value ? (
                  <div className="container">
                    <CaraouselImgPreview
                      props={{
                        path: imgPath,
                        data: splitStringToArray(field.value),
                      }}
                    />
                  </div>
                ) : null}
              </>
            ) : null}
          </FormItem>
        );
      }}
    />
  );
};

export default FormFile;
