import { deleteBuku } from "@/services/buku";
import { ColumnDef } from "@tanstack/react-table";
import { DataBukuType } from "../schema";
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
import useGetDataBuku from "../_hooks/useGetDataBuku";
import { AdminRoleEnum, useAuthUserContext } from "@/context/auth-provider";

export const SkeletonTableBuku = () => {
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

export const CardDataBuku = () => {
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { data, firstIsLoading, firstIsError } = useGetDataBuku();

  const columns: ColumnDef<DataBukuType>[] = [
    {
      accessorKey: "judul",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Judul" />
      ),
    },
    {
      accessorKey: "kode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kode" />
      ),
    },
    {
      accessorKey: "jumlah",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jumlah" />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.getValue("id");
        const judul = row.getValue("judul");

        return role === AdminRoleEnum.staff_prhp ? (
          <ActionButton
            id={id as string}
            rowDataWarning={judul as string}
            deleteData={() => deleteBuku(id as string)}
          />
        ) : null;
      },
    },
  ];

  if (firstIsError) {
    return (
      <Card className="w-full border-2 border-primary">
        <CardHeader>
          <CardTitle>Data Buku</CardTitle>
          <CardDescription>Table for show data buku</CardDescription>
        </CardHeader>
        <CardContent>Oops! Something Wrong...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-2 border-primary">
      <CardHeader className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <CardTitle>Data Buku</CardTitle>
          <CardDescription>Table for show data buku</CardDescription>
        </div>
        {role === AdminRoleEnum.staff_prhp ? (
          <Link to={"/data-buku/create"}>
            <Button>
              <Plus className="mr-1" /> Tambah Data
            </Button>
          </Link>
        ) : null}
      </CardHeader>
      <CardContent>
        {firstIsLoading ? (
          <SkeletonTableBuku />
        ) : (
          <DataTable columns={columns} data={data ? data : []} />
        )}
      </CardContent>
    </Card>
  );
};
