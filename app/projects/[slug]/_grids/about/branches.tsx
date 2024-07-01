import { getRepoBranches } from "@/lib/service";
import {
  GitBranchIcon,
  GitCommitHorizontalIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";

type Props = {
  owner: string;
  slug: string;
};

export default async function BranchesGrid({ owner, slug }: Props) {
  const branches = await getRepoBranches(owner, slug);

  return (
    <div className="rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <div className="flex items-center gap-2">
        <GitBranchIcon size={20} />
        <h3 className="text-lg font-bold text-white">
          {branches.length} {branches.length > 1 ? "Branches" : "Branch"}
        </h3>
      </div>
      <ul className="mt-4 flex flex-col gap-1">
        {branches.map((branch) => (
          <li key={branch.name}>
            <Link
              href={branch.commit.url}
              target="_blank"
              className="flex items-center gap-2 text-sm text-[#F2E9E4]"
            >
              {branch.name}
              <GitCommitHorizontalIcon size={16} />
              <span className="text-xs text-[#C9ADA7]/60">
                {branch.commit.sha.slice(0, 7)}
              </span>
              {branch.protected && (
                <ShieldCheckIcon size={16} color="#C9ADA7" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
