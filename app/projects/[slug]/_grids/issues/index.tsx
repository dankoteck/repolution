import { Input } from "@/components/ui/input";
import { getRepoIssues } from "@/lib/service";
import { BadgeAlertIcon } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  owner: string;
  slug: string;
};

export default async function IssuesGrid({ owner, slug }: Props) {
  const issues = await getRepoIssues(owner, slug);

  return (
    <div className="col-span-8 flex flex-col rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <div className="flex items-center gap-2">
        <BadgeAlertIcon size={20} />
        <h3 className="text-lg font-bold text-white">
          {issues.length} {issues.length > 1 ? "Issues" : "Issue"}
        </h3>
      </div>

      <Input
        placeholder="Search issues..."
        className="mb-3 mt-4 border border-[#F2E9E4] bg-transparent duration-150 placeholder:text-white"
      />
      <DataTable columns={columns} data={issues} />
    </div>
  );
}
