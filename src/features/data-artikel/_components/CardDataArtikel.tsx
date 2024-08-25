import { deleteArtikel } from "@/services/artikel";
import { ColumnDef } from "@tanstack/react-table";
import { DataArtikelType } from "../schema";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/costum/DataTable";
import ActionButton from "@/components/costum/ActionButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import useGetDataArtikel from "../_hooks/useGetDataArtikel";
import { AdminRoleEnum, useAuthUserContext } from "@/context/auth-provider";

export const SkeletonTableArtikel = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array(5)
            .fill(5)
            .map((_, id) => (
              <TableHead key={id}>
                <Skeleton className="h-8 w-full" />
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5)
          .fill(5)
          .map((_, id) => (
            <TableRow key={id}>
              {Array(5)
                .fill(5)
                .map((_, id) => (
                  <TableCell key={id}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export const CardDataArtikel = () => {
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { data, firstIsLoading, firstIsError } = useGetDataArtikel();

  const columns: ColumnDef<DataArtikelType>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      accessorKey: "subTitle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sub Title" />
      ),
    },
    {
      accessorKey: "commentEnabled",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Comment" />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.getValue("id");
        const title = row.getValue("title");

        return role === AdminRoleEnum.staff_kominfo ? (
          <ActionButton
            id={id as string}
            rowDataWarning={title as string}
            deleteData={() => deleteArtikel(id as string)}
          />
        ) : null;
      },
    },
  ];

  if (firstIsError) {
    return (
      <Card className="w-full border-2 border-primary">
        <CardHeader>
          <CardTitle>Data Artikel</CardTitle>
          <CardDescription>Table for show data Artikel</CardDescription>
        </CardHeader>
        <CardContent>Oops! Something Wrong...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-2 border-primary">
      <CardHeader className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <CardTitle>Data Artikel</CardTitle>
          <CardDescription>Table for show data Artikel</CardDescription>
        </div>
        {role === AdminRoleEnum.staff_kominfo ? (
          <Link to={"/data-artikel/create"}>
            <Button>
              <Plus className="mr-1" /> Tambah Data
            </Button>
          </Link>
        ) : null}
      </CardHeader>
      <CardContent>
        {firstIsLoading ? (
          <SkeletonTableArtikel />
        ) : (
          <DataTable columns={columns} data={data ? data : []} />
        )}
      </CardContent>
    </Card>
  );
};
