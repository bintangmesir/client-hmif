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
import useUpdateDataHimpunan from "../_hooks/useUpdateDataHimpunan";
import useCsrfToken from "@/hooks/useCsrfToken";
import FormTextarea from "@/components/costum/FormTextarea";
import FormFile from "@/components/costum/FormFile";

const CardUpdateDataHimpunan = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit, id } = useUpdateDataHimpunan();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Data Himpunan</CardTitle>
            <CardDescription>Form for update data himpunan</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"jumlahDepartemen"}
              inputProps={{ placeholder: "5", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"jumlahPengurus"}
              inputProps={{ placeholder: "10", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"jumlahMahasiswa"}
              inputProps={{ placeholder: "1000", type: "number" }}
            />
            <FormTextarea
              form={form.control}
              name={"namaProker"}
              textareaProps={{ placeholder: "example" }}
              description="Format pengisian menggunakan ; diakhir nama proker, contoh LDKM;InformationAll;Kunjungan Industri"
            />
            <FormFile
              form={form.control}
              name={"galeriMahasiswa"}
              imgPath={`${import.meta.env.VITE_APP_FILE_SERVER}/himpunan/${id}`}
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

export default CardUpdateDataHimpunan;
