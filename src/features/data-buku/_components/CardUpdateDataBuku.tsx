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
import useUpdateDataBuku from "../_hooks/useUpdateDataBuku";
import useCsrfToken from "@/hooks/useCsrfToken";
import FormTextarea from "@/components/costum/FormTextarea";
import FormFile from "@/components/costum/FormFile";

const CardUpdateDataBuku = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit, id } = useUpdateDataBuku();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Data Buku</CardTitle>
            <CardDescription>Form for update data buku</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"judul"}
              inputProps={{ placeholder: "Judul buku", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"kode"}
              inputProps={{ placeholder: "Kode buku", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"penulis"}
              inputProps={{ placeholder: "Nama penulis", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"penerbit"}
              inputProps={{ placeholder: "Nama penerbit", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"tahunTerbit"}
              inputProps={{ placeholder: "1999", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"jumlah"}
              inputProps={{ placeholder: "Jumlah buku", type: "number" }}
            />
            <FormTextarea
              form={form.control}
              name={"abstrak"}
              textareaProps={{ placeholder: "example" }}
            />
            <FormFile
              form={form.control}
              name={"cover"}
              imgPath={`${import.meta.env.VITE_APP_FILE_SERVER}/buku/${id}`}
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

export default CardUpdateDataBuku;
