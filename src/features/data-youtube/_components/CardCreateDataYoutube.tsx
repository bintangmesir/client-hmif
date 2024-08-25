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
import useCreateDataYoutube from "../_hooks/useCreateDataYoutube";
import useCsrfToken from "@/hooks/useCsrfToken";

const CardCreateDataYoutube = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit } = useCreateDataYoutube();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Create Data Youtube</CardTitle>
            <CardDescription>Form for create data youtube</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"judul"}
              inputProps={{ placeholder: "Judul", type: "text" }}
            />
            <FormInput
              form={form.control}
              name={"link"}
              inputProps={{
                placeholder: "http://youtube.com/embed/...",
                type: "text",
              }}
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

export default CardCreateDataYoutube;
