import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import AboutGrid from "./_grids/about";
import About2Grid from "./_grids/about/about-2";
import IssuesGrid from "./_grids/issues";

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
    <section className="row-auto grid max-h-screen w-full grid-cols-12 gap-4">
      <div className="col-span-4 flex flex-col gap-4">
        <AboutGrid owner={user.username} slug={params.slug} />
        <About2Grid owner={user.username} slug={params.slug} />
      </div>
      <IssuesGrid owner={user.username} slug={params.slug} />
    </section>
  );
}
