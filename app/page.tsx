import GithubIcon from "@/assets/icons/github.svg";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import UIHeader from "@/components/ui/header";
import { validateRequest } from "@/lib/auth";
import { getRepos } from "@/lib/service";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const repos = await getRepos(user!.username);

  return (
    <>
      <UIHeader username={user.username} />

      <main className="pointer-events-auto fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <section className="max-h-screen w-full">
          <div className="mx-auto flex w-full max-w-[500px] flex-col items-center">
            <Image
              alt="Github Logo"
              src={GithubIcon}
              width={48}
              height={48}
              className="mb-5 invert"
            />
            <h2 className="text-3xl font-bold capitalize">Github Repository</h2>
            <p className="mt-1 text-base text-gray-200">
              Select a GitHub repository to import
            </p>
            <BackgroundGradient
              containerClassName="mt-8 w-full p-1"
              className="rounded-xl bg-gray-800 px-4 py-2"
            >
              <ul className="no-scrollbar max-h-[500px] overflow-scroll">
                {repos.map((repo, index) => (
                  <li
                    key={repo.id}
                    className={cn(
                      "flex items-center justify-between gap-2 border-b border-gray-700 py-4",
                      {
                        "border-b-0": index === repos.length - 1,
                      },
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="line-clamp-1 text-lg font-bold">
                        {repo.name}
                      </p>
                      <p
                        className={cn("line-clamp-2 text-sm text-gray-400", {
                          "text-xs italic text-gray-400/60": !repo.description,
                        })}
                      >
                        {repo.description ? repo.description : "No description"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-gray-500"
                    >
                      Import
                    </Button>
                  </li>
                ))}
              </ul>
            </BackgroundGradient>
          </div>
        </section>
      </main>
    </>
  );
}
