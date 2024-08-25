import { Loader, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useCsrfToken from "@/hooks/useCsrfToken";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useMutation } from "react-query";

const ActionButton = ({
  id,
  rowDataWarning,
  deleteData,
}: {
  id: string;
  rowDataWarning: string;
  deleteData: (id: string) => Promise<void>;
}) => {
  useCsrfToken();
  const router = useLocation();
  const navigate = useNavigate({ from: router.pathname });
  const { isLoading, mutateAsync: deleteDataMutation } = useMutation({
    mutationKey: ["deleteData"],
    mutationFn: deleteData,
    onSuccess: () => {
      navigate({ to: "/dashboard" });
    },
  });
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <Link className="w-full" to={`${router.pathname}/${id}/edit`}>
            <Button className="w-full">
              <Pencil className="mr-1" size={16} />
              Edit
            </Button>
          </Link>
          <DialogTrigger className="flex w-full items-center justify-center rounded-md bg-destructive p-3 text-sm text-white">
            <Trash className="mr-1" size={16} /> Delete
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perhatian data ini akan dihapus !</DialogTitle>
          <DialogDescription className="pt-2">
            Apakah anda yakin ingin menghapus data {rowDataWarning}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {!isLoading ? (
            <Button
              className="w-full"
              variant={"destructive"}
              onClick={async () => {
                try {
                  await deleteDataMutation(id);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Delete <Trash className="ml-2" size={16} />
            </Button>
          ) : (
            <Button
              className="flex w-full items-center justify-center"
              disabled
            >
              <Loader className="mr-2 animate-spin" /> Loading
            </Button>
          )}
          <DialogClose
            asChild
            className="flex items-center justify-between gap-8"
          >
            <Button
              type="button"
              variant="secondary"
              className="flex items-center justify-center"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionButton;
