import { deletePengurus } from "@/services/pengurus";
import { ColumnDef } from "@tanstack/react-table";
import { DataPengurusType } from "../schema";
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
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import useGetDataPengurus from "../_hooks/useGetDataPengurus";
import { AdminRoleEnum, useAuthUserContext } from "@/context/auth-provider";

export const SkeletonTablePengurus = () => {
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

export const CardDataPengurus = () => {
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { data, firstIsLoading, firstIsError } = useGetDataPengurus();

  const columns: ColumnDef<DataPengurusType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
    },
    {
      accessorKey: "departemen",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departemen" />
      ),
      cell: ({ row }) => {
        const departemen = row.getValue("departemen");
        return <>{stringTransformToWhiteSpace(departemen as string)}</>;
      },
    },
    {
      accessorKey: "jabatan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jabatan" />
      ),
      cell: ({ row }) => {
        const jabatan = row.getValue("jabatan");
        return <>{stringTransformToWhiteSpace(jabatan as string)}</>;
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.getValue("id");
        const name = row.getValue("name");

        return role === AdminRoleEnum.staff_kominfo ? (
          <ActionButton
            id={id as string}
            rowDataWarning={name as string}
            deleteData={() => deletePengurus(id as string)}
          />
        ) : null;
      },
    },
  ];

  if (firstIsError) {
    return (
      <Card className="w-full border-2 border-primary">
        <CardHeader>
          <CardTitle>Data Pengurus</CardTitle>
          <CardDescription>Table for show data pengurus</CardDescription>
          <Link to={"/data-pengurus/create"}>
            <Button>
              <Plus className="mr-1" /> Tambah Data
            </Button>
          </Link>
        </CardHeader>
        <CardContent>Oops! Something Wrong...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-2 border-primary">
      <CardHeader className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <CardTitle>Data Pengurus</CardTitle>
          <CardDescription>Table for show data pengurus</CardDescription>
        </div>
        {role === AdminRoleEnum.staff_kominfo ? (
          <Link to={"/data-pengurus/create"}>
            <Button>
              <Plus className="mr-1" /> Tambah Data
            </Button>
          </Link>
        ) : null}
      </CardHeader>
      <CardContent>
        {firstIsLoading ? (
          <SkeletonTablePengurus />
        ) : (
          <DataTable columns={columns} data={data ? data : []} />
        )}
      </CardContent>
    </Card>
  );
};
