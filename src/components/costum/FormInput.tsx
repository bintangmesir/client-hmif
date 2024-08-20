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

type FormInputProps<T extends FieldValues> = {
  form: Control<T>;
  name: FieldPath<T>;
  inputProps: InputProps;
  description?: string;
};

const FormInput = <T extends FieldValues>({
  form,
  name,
  inputProps,
  description,
}: FormInputProps<T>) => {
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
              <Input {...inputProps} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
