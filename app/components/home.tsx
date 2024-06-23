import type { JwtHeader, JwtPayload, SigningKeyCallback } from "jsonwebtoken";
import JsonWebToken from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { SessionAuthForNextJS } from "./supertokens/sessionAuthForNextJS";
import { TryRefreshComponent } from "./supertokens/tryRefreshClientComponent";

const client = jwksClient({
  jwksUri: `${process.env.NEXT_PUBLIC_CONNECTION_URI}/.well-known/jwks.json`,
});

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

/**
 * A helper function to retrieve session details on the server side.
 *
 * NOTE: This function does not use the getSession / verifySession function from the supertokens-node SDK
 * because those functions may update the access token. These updated tokens would not be
 * propagated to the client side properly, as request interceptors do not run on the server side.
 * So instead, we use regular JWT verification library
 */
async function getSSRSessionHelper(): Promise<{
  accessTokenPayload: JwtPayload | undefined;
  hasToken: boolean;
  error: Error | undefined;
}> {
  const accessToken = getAccessToken();
  const hasToken = !!accessToken;
  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      return { accessTokenPayload: decoded, hasToken, error: undefined };
    }
    return { accessTokenPayload: undefined, hasToken, error: undefined };
  } catch (error) {
    if (error instanceof JsonWebToken.TokenExpiredError) {
      return { accessTokenPayload: undefined, hasToken, error: undefined };
    }
    return { accessTokenPayload: undefined, hasToken, error: error as Error };
  }
}

export async function HomePage({ children }: PropsWithChildren) {
  const { accessTokenPayload, hasToken, error } = await getSSRSessionHelper();

  if (error) {
    return (
      <div>
        Something went wrong while trying to get the session. Error -{" "}
        {error.message}
      </div>
    );
  }

  // `accessTokenPayload` will be undefined if it the session does not exist or has expired
  if (accessTokenPayload === undefined) {
    if (!hasToken) {
      /**
       * This means that the user is not logged in. If you want to display some other UI in this
       * case, you can do so here.
       */
      return redirect("/auth");
    }

    /**
     * This means that the session does not exist but we have session tokens for the user. In this case
     * the `TryRefreshComponent` will try to refresh the session.
     *
     * To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
     */
    return <TryRefreshComponent key={Date.now()} />;
  }

  /**
   * SessionAuthForNextJS will handle proper redirection for the user based on the different session states.
   * It will redirect to the login page if the session does not exist etc.
   */
  return <SessionAuthForNextJS>{children}</SessionAuthForNextJS>;
}
