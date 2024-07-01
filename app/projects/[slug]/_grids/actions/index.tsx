import { getRepoActionRuns } from "@/lib/service";
import { formatDate } from "@/lib/utils";
import {
  CircleCheckIcon,
  CircleXIcon,
  OctagonAlertIcon,
  OctagonIcon,
  TriangleAlertIcon,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";

type Props = {
  owner: string;
  slug: string;
};

function getIconByConclusion(conclusion: string) {
  switch (conclusion) {
    case "success":
      return <CircleCheckIcon size={16} color="#22c55e" />;
    case "failure":
      return <CircleXIcon size={16} color="#ef4444" />;
    case "action_required":
      return <TriangleAlertIcon size={16} color="#f59e0b" />;
    case "cancelled":
      return <OctagonAlertIcon size={16} color="#6b7280" />;
    case "skipped":
      return <OctagonIcon size={16} color="#6b7280" />;
    default:
      return null;
  }
}

export default async function ActionsGrid({ owner, slug }: Props) {
  const actions = await getRepoActionRuns(owner, slug);

  return (
    <div className="col-span-8 flex flex-col overflow-x-auto rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <div className="flex items-center gap-2">
        <WorkflowIcon size={20} />
        <h3 className="text-lg font-bold text-white">
          {actions.total_count} {actions.total_count > 1 ? "Actions" : "Action"}
        </h3>
      </div>

      {actions.workflow_runs.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {actions.workflow_runs.map((action) => (
            <li key={action.id} className="flex items-end justify-between">
              <div className="flex items-center gap-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {action.display_title}
                    {action.conclusion &&
                      getIconByConclusion(action.conclusion)}
                  </div>
                  <Link href="/" className="text-xs text-[#C9ADA7]/50">
                    {action.head_branch}
                  </Link>
                </div>
              </div>

              <p className="text text-xs font-medium text-[#C9ADA7]">
                {formatDate(action.run_started_at)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 flex h-full items-center justify-center text-sm">
          No results.
        </p>
      )}
    </div>
  );
}
