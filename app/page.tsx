import GithubIcon from "@/assets/icons/github.svg";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { validateRequest } from "@/lib/auth";
import { getRepos } from "@/lib/service";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
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
    <section className="max-h-screen w-full">
      <div className="w-full rounded-lg border border-[#C9ADA7] bg-[#22223B] p-8">
        <div className="flex w-full items-center gap-4">
          <Image
            alt="Github Logo"
            src={GithubIcon}
            width={36}
            height={36}
            className="invert"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 className="text-2xl font-bold capitalize">
              Import Github Repository
            </h2>
            <h3 className="text-base">
              Get started by importing your Github repositories.
            </h3>
          </div>

          <Input
            placeholder="Search repositories..."
            className="flex-1 border border-[#C9ADA7] bg-transparent duration-150 placeholder:text-white"
          />
        </div>

        <ul className="mt-4 rounded-md border border-dashed border-[#C9ADA7]">
          {repos.map((repo, index) => (
            <li
              key={repo.id}
              className={cn(
                "flex items-center justify-between gap-2 border-b border-dashed border-[#C9ADA7] px-4 py-6",
                {
                  "border-b-0": index === repos.length - 1,
                },
              )}
            >
              <div>
                <Badge>{repo.language}</Badge>
                <p className="mt-2 flex items-center gap-1">
                  <span className="text-lg font-bold text-white">
                    {repo.name}
                  </span>
                  &bull;
                  <span className="text-xs font-normal text-[#F2E9E4]">
                    {dayjs().to(dayjs(repo.updated_at))}
                  </span>
                </p>
                <p
                  className={cn("mt-1 line-clamp-1 text-sm text-gray-400", {
                    "text-xs italic text-[#C9ADA7]": !repo.description,
                  })}
                >
                  {repo.description ? repo.description : "(No description)"}
                </p>
              </div>
              <Link
                href={`/project/${repo.id}`}
                className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#F2E9E4] px-4 py-2 text-sm font-medium text-[#22223B]"
              >
                Import
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
