import GithubIcon from "@/assets/icons/github.svg";
import { Badge } from "@/components/ui/badge";
import { getRepoById } from "@/lib/service";
import { cn, formatDate } from "@/lib/utils";
import { GitForkIcon, SquareArrowOutUpRightIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  owner: string;
  slug: string;
};

export default async function AboutGrid({ owner, slug }: Props) {
  const repo = await getRepoById(owner, slug);

  return (
    <div className="flex flex-1 flex-col justify-between rounded-lg border border-[#F2E9E4] bg-[#22223B] p-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="line-clamp-1 text-lg font-bold text-white">
            {repo.name}
          </h3>
          <Badge
            className="border-[#F2E9E4] px-2 text-xs font-normal capitalize"
            variant="outline"
          >
            {repo.visibility}
          </Badge>
        </div>
        {repo.homepage && (
          <Link
            href={repo.homepage}
            target="_blank"
            className="flex items-center gap-2 text-sm text-[#F2E9E4]/50"
          >
            {repo.homepage}
            <SquareArrowOutUpRightIcon size={16} color="#F2E9E4" />
          </Link>
        )}

        <Badge className="mt-4 flex w-fit items-center gap-1">
          <Image alt="Github Logo" src={GithubIcon} width={16} height={16} />
          <span className="line-clamp-1">{repo.full_name}</span>
        </Badge>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-1 text-[#C9ADA7]">
            <StarIcon size={16} />
            Star <b>{repo.stargazers_count}</b>
          </div>
          <div className="flex items-center gap-1 text-[#C9ADA7]">
            <GitForkIcon size={16} />
            Fork <b>{repo.forks_count}</b>
          </div>
          {repo.topics && (
            <ul className="flex flex-wrap items-center gap-2 text-[#C9ADA7]">
              {repo.topics.map((topic) => (
                <li key={topic}>
                  <Badge>{topic}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p
          className={cn("mt-4 text-sm", {
            "italic text-[#C9ADA7]/50": !repo.description,
          })}
        >
          {repo.description ? repo.description : "(No description)"}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        {repo.language && <Badge>{repo.language}</Badge>}
        <p className="text-right text-xs text-[#F2E9E4]/50">
          Last updated: {formatDate(repo.updated_at)}
        </p>
      </div>
    </div>
  );
}
