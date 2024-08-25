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
import useCreateDataAdmin from "../_hooks/useCreateDataAdmin";
import FormSelect from "@/components/costum/FormSelect";
import FormFile from "@/components/costum/FormFile";
import useCsrfToken from "@/hooks/useCsrfToken";
import { AdminRoleEnum } from "@/context/auth-provider";
import { useAuthUserContext } from "@/context/auth-provider";

const CardCreateDataAdmin = () => {
  useCsrfToken();
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { form, isLoading, onSubmit } = useCreateDataAdmin();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Create Data Admin</CardTitle>
            <CardDescription>Form for create data admin</CardDescription>
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
            <FormInput
              form={form.control}
              name={"password"}
              inputProps={{ placeholder: "********", type: "password" }}
            />
            <FormInput
              form={form.control}
              name={"confirmPassword"}
              inputProps={{ placeholder: "********", type: "password" }}
            />
            <FormSelect
              form={form.control}
              name={"role"}
              values={
                role && role === AdminRoleEnum.kadep_kominfo
                  ? ["staff_kominfo"]
                  : role && role === AdminRoleEnum.kadep_prhp
                    ? ["staff_prhp"]
                    : ["kadep_kominfo", "kadep_prhp"]
              }
              placeholder="Select Role Admin"
            />
            <FormFile form={form.control} name={"fotoProfile"} />
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

export default CardCreateDataAdmin;
