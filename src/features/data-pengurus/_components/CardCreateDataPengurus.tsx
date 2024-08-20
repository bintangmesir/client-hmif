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
import useCreateDataPengurus from "../_hooks/useCreateDataPengurus";
import useCsrfToken from "@/hooks/useCsrfToken";
import FormFile from "@/components/costum/FormFile";
import FormSelect from "@/components/costum/FormSelect";

const CardCreateDataPengurus = () => {
  useCsrfToken();
  const { form, isLoading, onSubmit } = useCreateDataPengurus();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Create Data Pengurus</CardTitle>
            <CardDescription>Form for create data pengurus</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form.control}
              name={"name"}
              inputProps={{ placeholder: "Jhon doe", type: "text" }}
            />
            <FormSelect
              form={form.control}
              name={"departemen"}
              values={[
                "kahim_wakahim",
                "sekretaris",
                "bendahara",
                "departemen_iptek",
                "departemen_kominfo",
                "departemen_kaderisasi",
                "departemen_prhp",
                "departemen_pengmas",
              ]}
              placeholder="Select Role Departemen"
            />
            <FormSelect
              form={form.control}
              name={"jabatan"}
              values={[
                "ketua_himpunan",
                "wakil_ketua_himpunan",
                "sekretaris_1",
                "sekretaris_2",
                "bendahara_1",
                "bendahara_2",
                "kepala_departemen",
                "staff_departemen",
              ]}
              placeholder="Select Role Departemen"
            />
            <FormFile form={form.control} name={"foto"} />
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

export default CardCreateDataPengurus;
