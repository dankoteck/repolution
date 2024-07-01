import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Deployments, getRepoDeploymentsStatus } from "@/lib/service";
import { formatDate } from "@/lib/utils";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";

type Props = {
  data: Deployments[number];
  owner: string;
  slug: string;
};

export default async function DeploymentItem({ data, owner, slug }: Props) {
  const statusData = await getRepoDeploymentsStatus(owner, slug, data.id);
  const isSuccess = statusData.state === "success";

  return (
    <li key={data.id} className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {data.creator && (
          <Avatar className="size-8">
            <AvatarImage src={data.creator.avatar_url} />
          </Avatar>
        )}
        <div className="mr-2 flex flex-col">
          <div className="flex items-center gap-2">
            <p className="line-clamp-1 text-base font-medium">
              {data.environment}
            </p>
            {isSuccess && <CircleCheckIcon size={16} color="#22c55e" />}
            {!isSuccess && <CircleXIcon size={16} color="#ef4444" />}
          </div>
          <p className="line-clamp-1 text-sm text-[#C9ADA7]/50">
            {statusData.description}
          </p>
        </div>
      </div>
      <p className="text text-sm font-medium text-[#C9ADA7]">
        {formatDate(data.created_at)}
      </p>
    </li>
  );
}
