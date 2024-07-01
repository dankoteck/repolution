"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Issues } from "@/lib/service";
import { cn, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

export const columns: ColumnDef<Issues[0]>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Issues
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { body, title, user } = row.original;

      return (
        <div className="flex gap-2">
          {user && (
            <Avatar className="size-8">
              <AvatarImage src={user.avatar_url} />
            </Avatar>
          )}

          <div className="flex flex-col gap-1">
            <p className="line-clamp-1 text-sm font-medium">{title}</p>
            <p className="line-clamp-1 text-xs text-[#F2E9E4]/50">{body}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <p className="">{formatDate(row.getValue("created_at"))}</p>
    ),
  },
  {
    accessorKey: "state",
    header: "Status",
    cell: ({ row }) => {
      const isOpen = row.getValue("state") === "open";

      return (
        <div
          className={cn(
            "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-[#22223B]",
            {
              "bg-red-100": !isOpen,
            },
          )}
        >
          <span
            className={cn("me-1 h-2 w-2 rounded-full bg-green-500", {
              "bg-red-500 text-[#F2E9E4]": !isOpen,
            })}
          />
          {isOpen ? "Open" : "Closed"}
        </div>
      );
    },
  },
];
