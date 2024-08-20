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

import { Textarea, TextareaProps } from "../ui/textarea";

type FormTextareaProps<T extends FieldValues> = {
  form: Control<T>;
  name: FieldPath<T>;
  textareaProps: TextareaProps;
  description?: string;
};

const FormTextarea = <T extends FieldValues>({
  form,
  name,
  textareaProps,
  description,
}: FormTextareaProps<T>) => {
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
              <Textarea {...textareaProps} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormTextarea;
