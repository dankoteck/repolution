import { Input } from "@/components/ui/input";
import { getRepoPullRequests } from "@/lib/service";
import { GitPullRequestArrowIcon } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  owner: string;
  slug: string;
};

export default async function PullRequestGrid({ owner, slug }: Props) {
  const pullRequests = await getRepoPullRequests(owner, slug);

  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <div className="flex items-center gap-2">
        <GitPullRequestArrowIcon size={20} />
        <h3 className="text-lg font-bold text-white">
          {pullRequests.length}{" "}
          {pullRequests.length > 1 ? "Pull Requests" : "Pull Request"}
        </h3>
      </div>

      <Input
        placeholder="Search pull requests..."
        className="mb-3 mt-4 border border-[#F2E9E4] bg-transparent duration-150 placeholder:text-white"
      />
      <DataTable columns={columns} data={pullRequests} />
    </div>
  );
}
