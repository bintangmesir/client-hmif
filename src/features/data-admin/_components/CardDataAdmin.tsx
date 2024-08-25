import { deleteAdmin } from "@/services/admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataAdminType } from "../schema";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/costum/DataTable";
import { Badge } from "@/components/ui/badge";
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import ActionButton from "@/components/costum/ActionButton";
import { useAuthUserContext } from "@/context/auth-provider";
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
import useGetDataAdmin from "../_hooks/useGetDataAdmin";

export const SkeletonTableAdmin = () => {
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

export const CardDataAdmin = () => {
  const admin = useAuthUserContext();
  const role = admin?.data.role;
  const { data, firstIsLoading, firstIsError } = useGetDataAdmin();

  const columns: ColumnDef<DataAdminType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const roleRow = row.getValue("role");

        const badgeRole = [
          {
            role: "super_admin",
            className:
              "bg-red-700 capitalize text-white hover:bg-red-700 hover:text-white text-center",
          },
          {
            role: "kadep_kominfo",
            className:
              "bg-yellow-500 text-black hover:bg-yellow-500 hover:text-black text-center",
          },
          {
            role: "kadep_prhp",
            className:
              "bg-blue-700 text-white hover:bg-blue-700 hover:text-white text-center",
          },
          {
            role: "staff_kominfo",
            className:
              "bg-orange-500 text-black hover:bg-orange-500 hover:text-black text-center",
          },
          {
            role: "staff_prhp",
            className:
              "bg-purple-700 text-white hover:bg-purple-600 hover:text-white text-center",
          },
        ];

        return (
          <Badge
            className={`${
              badgeRole.filter((roleBadge) => roleRow === roleBadge.role)[0]
                .className
            }`}
          >
            {stringTransformToWhiteSpace(roleRow as string)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.getValue("id");
        const roleRow = row.getValue("role");
        const name = row.getValue("name");

        if (
          role === "super_admin" &&
          (roleRow === "kadep_kominfo" || roleRow === "kadep_prhp")
        ) {
          return (
            <ActionButton
              id={id as string}
              rowDataWarning={name as string}
              deleteData={() => deleteAdmin(id as string)}
            />
          );
        } else if (role === "kadep_kominfo" && roleRow === "staff_kominfo") {
          return (
            <ActionButton
              id={id as string}
              rowDataWarning={name as string}
              deleteData={() => deleteAdmin(id as string)}
            />
          );
        } else if (role === "kadep_prhp" && roleRow === "staff_prhp") {
          return (
            <ActionButton
              id={id as string}
              rowDataWarning={name as string}
              deleteData={() => deleteAdmin(id as string)}
            />
          );
        } else {
          return null;
        }
      },
    },
  ];

  if (firstIsError) {
    return (
      <Card className="w-full border-2 border-primary">
        <CardHeader className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <CardTitle>Data Admin</CardTitle>
            <CardDescription>Table for show data admin</CardDescription>
          </div>
          <Link to={"/data-admin/create"}>
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
          <CardTitle>Data Admin</CardTitle>
          <CardDescription>Table for show data admin</CardDescription>
        </div>
        <Link to={"/data-admin/create"}>
          <Button>
            <Plus className="mr-1" /> Tambah Data
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {firstIsLoading ? (
          <SkeletonTableAdmin />
        ) : (
          <DataTable columns={columns} data={data ? data : []} />
        )}
      </CardContent>
    </Card>
  );
};
