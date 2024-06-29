import GithubIcon from "@/assets/icons/github.svg";
import { Button } from "@/components/ui/button";
import UIHeader from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { validateRequest } from "@/lib/auth";
import { getRepos } from "@/lib/service";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { redirect } from "next/navigation";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default async function HomePage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const repos = await getRepos(user!.username);

  return (
    <>
      <UIHeader username={user.username} />

      <main className="container -mt-24 grid w-full grid-cols-3 gap-12">
        <section className="col-span-2 max-h-screen w-full">
          <div className="w-full rounded-lg border border-[#C9ADA7] bg-[#22223B] p-8">
            <div className="flex w-fit items-start gap-4">
              <Image
                alt="Github Logo"
                src={GithubIcon}
                width={36}
                height={36}
                className="mt-1.5 invert"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold capitalize">
                  Import Github Repository
                </h2>
                <h3 className="text-base">
                  Get started by importing your Github repositories.
                </h3>
              </div>
            </div>

            <Input
              placeholder="Search repositories..."
              className="mt-6 border border-[#C9ADA7] bg-transparent duration-150 placeholder:text-white"
            />

            <ul className="mt-4 rounded-md border border-[#C9ADA7]">
              {repos.map((repo, index) => (
                <li
                  key={repo.id}
                  className={cn(
                    "flex items-center justify-between gap-2 border-b border-[#C9ADA7] p-4",
                    {
                      "border-b-0": index === repos.length - 1,
                    },
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-1">
                      <span className="line-clamp-1 text-base font-bold text-white">
                        {repo.name}
                      </span>
                      &bull;
                      <span className="text-xs font-normal text-[#F2E9E4]">
                        {dayjs().to(dayjs(repo.updated_at))}
                      </span>
                    </p>
                    <p
                      className={cn("line-clamp-2 text-sm text-gray-400", {
                        "text-xs italic text-[#C9ADA7]": !repo.description,
                      })}
                    >
                      {repo.description ? repo.description : "(No description)"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg bg-[#F2E9E4] text-[#22223B] hover:bg-[#F2E9E4] hover:text-[#22223B]"
                  >
                    Import
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="h-24 w-full"></section>
      </main>
    </>
  );
}
