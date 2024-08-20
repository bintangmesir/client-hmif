import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import FormInput from "@/components/costum/FormInput";
import useUpdateDataBarang from "../_hooks/useUpdateDataBarang";
import useCsrfToken from "@/hooks/useCsrfToken";
import FormTextarea from "@/components/costum/FormTextarea";

const CardUpdateDataBarang = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit } = useUpdateDataBarang();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Data Barang</CardTitle>
            <CardDescription>Form for update data barang</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"nama"}
              inputProps={{ placeholder: "Perlengkapan", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"jumlah"}
              inputProps={{ placeholder: "2", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"baik"}
              inputProps={{ placeholder: "2", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"rusakRingan"}
              inputProps={{ placeholder: "2", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"rusakBerat"}
              inputProps={{ placeholder: "2", type: "number" }}
            />
            <FormTextarea
              form={form.control}
              name={"keterangan"}
              textareaProps={{ placeholder: "example" }}
            />
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

export default CardUpdateDataBarang;
