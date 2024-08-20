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
import useUpdateDataArtikel from "../_hooks/useUpdateDataArtikel";
import useCsrfToken from "@/hooks/useCsrfToken";
import FormFile from "@/components/costum/FormFile";
import FormSelect from "@/components/costum/FormSelect";

const CardUpdateDataArtikel = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit, thumbnail, id } = useUpdateDataArtikel();

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
              inputProps={{ placeholder: "Subjudul artikel", type: "text" }}
            />
            <FormSelect
              form={form.control}
              name={"commentEnabled"}
              values={["true", "false"]}
              placeholder="Select Role Departemen"
            />
            <FormFile
              form={form.control}
              name={"thumbnail"}
              imgDatas={thumbnail}
              imgPath={`${import.meta.env.VITE_APP_FILE_SERVER}/Artikel/${id}`}
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

export default CardUpdateDataArtikel;
