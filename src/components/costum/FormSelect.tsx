import { Control, FieldValues, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps<T extends FieldValues> = {
  form: Control<T>;
  name: FieldPath<T>;
  description?: string;
  placeholder: string;
  values: string[];
};

const FormSelect = <T extends FieldValues>({
  form,
  name,
  description,
  placeholder,
  values,
}: FormSelectProps<T>) => {
  return (
    <FormField
      control={form}
      name={name}
      render={({ field }) => (
        <FormItem className="pb-1">
          <FormLabel className="capitalize">
            {stringTransformToWhiteSpace(field.name)}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((value, id) => (
                <SelectItem className="capitalize" value={value} key={id}>
                  {stringTransformToWhiteSpace(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
