import { deleteYoutube, getYoutube } from "@/services/youtube";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { DataYoutubeType } from "../schema";
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

export const SkeletonTableYoutube = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array(4)
            .fill(4)
            .map((_, id) => (
              <TableHead key={id}>
                <Skeleton className="h-8 w-full" />
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(4)
          .fill(4)
          .map((_, id) => (
            <TableRow key={id}>
              {Array(4)
                .fill(4)
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

export const CardDataYoutube = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dataYoutube"],
    queryFn: getYoutube,
  });

  const columns: ColumnDef<DataYoutubeType>[] = [
    {
      accessorKey: "judul",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Judul" />
      ),
    },
    {
      accessorKey: "link",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Link" />
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

        return (
          <ActionButton
            id={id as string}
            rowDataWarning={judul as string}
            deleteData={() => deleteYoutube(id as string)}
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
            <CardTitle>Data Youtube</CardTitle>
            <CardDescription>Table for show data youtube</CardDescription>
          </div>
          <Link to={"/data-youtube/create"}>
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
          <CardTitle>Data Youtube</CardTitle>
          <CardDescription>Table for show data youtube</CardDescription>
        </div>
        <Link to={"/data-youtube/create"}>
          <Button>
            <Plus className="mr-1" /> Tambah Data
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonTableYoutube />
        ) : (
          <DataTable columns={columns} data={data ? data.data : []} />
        )}
      </CardContent>
    </Card>
  );
};
