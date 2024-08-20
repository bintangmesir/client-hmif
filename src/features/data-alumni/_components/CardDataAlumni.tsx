import { deleteAlumni, getAlumni } from "@/services/alumni";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { DataAlumniType } from "../schema";
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

export const SkeletonTableAlumni = () => {
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

export const CardDataAlumni = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dataAlumni"],
    queryFn: getAlumni,
  });

  const columns: ColumnDef<DataAlumniType>[] = [
    {
      accessorKey: "nama",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
    },
    {
      accessorKey: "angkatan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Angkatan" />
      ),
    },
    {
      accessorKey: "noTelephone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="No. Telephone" />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.getValue("id");
        const nama = row.getValue("nama");

        return (
          <ActionButton
            id={id as string}
            rowDataWarning={nama as string}
            deleteData={() => deleteAlumni(id as string)}
          />
        );
      },
    },
  ];

  if (isError) {
    return (
      <Card className="w-full border-2 border-primary">
        <CardHeader className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <CardTitle>Data Alumni</CardTitle>
            <CardDescription>Table for show data alumni</CardDescription>
          </div>
          <Link to={"/data-alumni/create"}>
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
          <CardTitle>Data Alumni</CardTitle>
          <CardDescription>Table for show data alumni</CardDescription>
        </div>
        <Link to={"/data-alumni/create"}>
          <Button>
            <Plus className="mr-1" /> Tambah Data
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonTableAlumni />
        ) : (
          <DataTable columns={columns} data={data ? data.data : []} />
        )}
      </CardContent>
    </Card>
  );
};
