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
import useProfile from "../_hooks/useProfile";
import FormFile from "@/components/costum/FormFile";
import useCsrfToken from "@/hooks/useCsrfToken";

const CardProfile = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit, id } = useProfile();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
            <CardDescription>Form for update profile</CardDescription>
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
                Update Profile
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

export default CardProfile;
