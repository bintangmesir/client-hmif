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
import useUpdatePassword from "../_hooks/useUpdatePassword";
import useCsrfToken from "@/hooks/useCsrfToken";

const CardUpdatePassword = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit } = useUpdatePassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>Form for update password</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"newPassword"}
              inputProps={{ placeholder: "********", type: "password" }}
            />
            <FormInput
              form={form.control}
              name={"confirmPassword"}
              inputProps={{ placeholder: "********", type: "password" }}
            />
            <FormInput
              form={form.control}
              name={"oldPassword"}
              inputProps={{ placeholder: "********", type: "password" }}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!isLoading ? (
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            ) : (
              <Button
                className="flex w-full items-center justify-center"
                disabled
              >
                <Loader className="mr-2 animate-spin" /> isLoading
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CardUpdatePassword;
