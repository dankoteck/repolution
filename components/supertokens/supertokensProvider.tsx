"use client";

import { frontendConfig, setRouter } from "@/config/supertokens/frontend";
import { usePathname, useRouter } from "next/navigation";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  setRouter(useRouter(), usePathname() || window.location.pathname);

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
