import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import useFormLogin from "../_hooks/useLogin";
import FormInput from "@/components/costum/FormInput";
import useCsrfToken from "@/hooks/useCsrfToken";

const CardAuth = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit } = useFormLogin();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login for administrator.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"email"}
              inputProps={{ placeholder: "example@mail.com", type: "email" }}
            />
            <FormInput
              form={form.control}
              name={"password"}
              inputProps={{ placeholder: "********", type: "password" }}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!isLoading ? (
              <Button type="submit" className="w-full">
                Login
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

export default CardAuth;
