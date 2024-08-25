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
import useCreateDataAlumni from "../_hooks/useCreateDataAlumni";
import useCsrfToken from "@/hooks/useCsrfToken";

const CardCreateDataAlumni = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit } = useCreateDataAlumni();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Create Data Alumni</CardTitle>
            <CardDescription>Form for create data alumni</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"nama"}
              inputProps={{ placeholder: "Jhon Doe", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"angkatan"}
              inputProps={{ placeholder: "2000", type: "number" }}
            />
            <FormInput
              form={form.control}
              name={"noTelephone"}
              inputProps={{ placeholder: "0888-XXXX-XXXX", type: "text" }}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!isLoading ? (
              <Button type="submit" className="w-full">
                Create Data
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

export default CardCreateDataAlumni;
