import { getRepoDeployments } from "@/lib/service";
import { GlobeIcon } from "lucide-react";
import DeploymentItem from "./item";

type Props = {
  owner: string;
  slug: string;
};

export default async function DeploymentsGrid({ owner, slug }: Props) {
  const deployments = await getRepoDeployments(owner, slug);

  return (
    <div className="col-span-4 flex flex-col rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <div className="flex items-center gap-2">
        <GlobeIcon size={20} />
        <h3 className="text-lg font-bold text-white">
          {deployments.length}{" "}
          {deployments.length > 1 ? "Deployments" : "Deployment"}
        </h3>
      </div>

      {deployments.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {deployments.map((deployment) => (
            <DeploymentItem
              owner={owner}
              slug={slug}
              data={deployment}
              key={deployment.id}
            />
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
