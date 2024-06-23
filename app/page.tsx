import { getSSRSessionHelper } from "@/lib/utils";
import { redirect } from "next/navigation";
import AuthError from "./components/shared/auth-error";
import { SessionAuthForNextJS } from "./components/supertokens/sessionAuthForNextJS";
import { TryRefreshComponent } from "./components/supertokens/tryRefreshClientComponent";

export default async function HomePage() {
  const { accessTokenPayload, hasToken, error } = await getSSRSessionHelper();

  if (error) return <AuthError error={error} />;

  if (accessTokenPayload === undefined) {
    if (!hasToken) return redirect("/auth");
    return <TryRefreshComponent key={Date.now()} />;
  }

  return (
    <SessionAuthForNextJS>
      <main className="">
        <h1>Hello World</h1>
      </main>
    </SessionAuthForNextJS>
  );
}
