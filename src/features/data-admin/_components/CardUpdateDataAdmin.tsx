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
import useUpdateDataAdmin from "../_hooks/useUpdateDataAdmin";
import FormFile from "@/components/costum/FormFile";
import useCsrfToken from "@/hooks/useCsrfToken";

const CardUpdateDataAdmin = () => {
  useCsrfToken();

  const { form, isLoading, onSubmit, id } = useUpdateDataAdmin();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Data Admin</CardTitle>
            <CardDescription>Form for update data admin</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"name"}
              inputProps={{ placeholder: "Jhon Doe", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"email"}
              inputProps={{ placeholder: "example@mail.com", type: "email" }}
            />
            <FormFile
              form={form.control}
              name={"fotoProfile"}
              imgPath={`${import.meta.env.VITE_APP_FILE_SERVER}/admin/${id}`}
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

export default CardUpdateDataAdmin;
