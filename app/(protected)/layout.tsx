import AuthError from "@/components/shared/auth-error";
import { SessionAuthForNextJS } from "@/components/supertokens/sessionAuthForNextJS";
import { TryRefreshComponent } from "@/components/supertokens/tryRefreshClientComponent";
import UIHeader from "@/components/ui/header";
import { appInfo } from "@/config/supertokens/appInfo";
import { UserMetadata } from "@/types/common";
import type { JwtHeader, JwtPayload, SigningKeyCallback } from "jsonwebtoken";
import JsonWebToken from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const client = jwksClient({
  jwksUri: `${process.env.NEXT_PUBLIC_CONNECTION_URI}/.well-known/jwks.json`,
});

async function getUserMetadata(token: string): Promise<UserMetadata | null> {
  try {
    const response = await fetch(`${appInfo.apiDomain}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  } catch (err) {
    return null;
  }
}

function getAccessToken(): string | undefined {
  return cookies().get("sAccessToken")?.value;
}

function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
}

async function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}

async function getSSRSessionHelper(): Promise<{
  accessTokenPayload: JwtPayload | undefined;
  userMetadata: UserMetadata | null;
  hasToken: boolean;
  error: Error | undefined;
}> {
  const accessToken = getAccessToken();
  const hasToken = !!accessToken;
  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      const userMetadata = await getUserMetadata(accessToken);

      return {
        accessTokenPayload: decoded,
        userMetadata,
        hasToken,
        error: undefined,
      };
    }
    return {
      accessTokenPayload: undefined,
      userMetadata: null,
      hasToken,
      error: undefined,
    };
  } catch (error) {
    if (error instanceof JsonWebToken.TokenExpiredError) {
      return {
        accessTokenPayload: undefined,
        userMetadata: null,
        hasToken: false,
        error: undefined,
      };
    }
    return {
      accessTokenPayload: undefined,
      userMetadata: null,
      hasToken: false,
      error: error as Error,
    };
  }
}

export default async function Layout({ children }: PropsWithChildren) {
  const { accessTokenPayload, hasToken, userMetadata, error } =
    await getSSRSessionHelper();

  if (error) return <AuthError error={error} />;

  if (accessTokenPayload === undefined) {
    if (!hasToken) return redirect("/auth");
    return <TryRefreshComponent key={Date.now()} />;
  }

  return (
    <SessionAuthForNextJS>
      <UIHeader userInfo={userMetadata!.userInfo} />
      {children}
    </SessionAuthForNextJS>
  );
}
