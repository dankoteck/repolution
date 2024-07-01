import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import AboutGrid from "./_grids/about";
import BranchesGrid from "./_grids/about/branches";
import ActionsGrid from "./_grids/actions";
import DeploymentsGrid from "./_grids/deployments";
import IssuesGrid from "./_grids/issues";
import PullRequestGrid from "./_grids/pull-request";

type Props = PropsWithChildren & {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <section className="row-auto grid w-full grid-cols-12 gap-4">
      <div className="col-span-4 flex flex-col gap-4">
        <AboutGrid owner={user.username} slug={params.slug} />
        <BranchesGrid owner={user.username} slug={params.slug} />
      </div>
      <IssuesGrid owner={user.username} slug={params.slug} />
      <PullRequestGrid owner={user.username} slug={params.slug} />
      <ActionsGrid owner={user.username} slug={params.slug} />
      <DeploymentsGrid owner={user.username} slug={params.slug} />
    </section>
  );
}
