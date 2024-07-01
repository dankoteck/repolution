import { Input } from "@/components/ui/input";
import { getRepoIssues } from "@/lib/service";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  owner: string;
  slug: string;
};

export default async function IssuesGrid({ owner, slug }: Props) {
  const issues = await getRepoIssues(owner, slug);

  return (
    <div className="col-span-8 flex flex-col gap-4 rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <Input
        placeholder="Search issues..."
        className="flex-1 border border-[#F2E9E4] bg-transparent duration-150 placeholder:text-white"
      />
      <DataTable columns={columns} data={issues} />
    </div>
  );
}
