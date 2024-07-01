"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PullRequests } from "@/lib/service";
import { cn, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

export const columns: ColumnDef<PullRequests[0]>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pull Requests
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
            <p
              className={cn("line-clamp-1 text-xs text-[#F2E9E4]/50", {
                italic: !!body,
              })}
            >
              {body ? body : "(No description)"}
            </p>
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
];
