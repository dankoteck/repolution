import { ensureSuperTokensInit } from "@/config/supertokens/backend";
import { NextRequest, NextResponse } from "next/server";
import SuperTokens from "supertokens-node";
import { withSession } from "supertokens-node/nextjs";

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return NextResponse.json({
        message: "Authentication required",
        status: 401,
      });
    }

    return NextResponse.json({
      userInfo: await SuperTokens.getUser(session.getUserId()),
      sessionHandle: session.getHandle(),
      accessTokenPayload: session.getAccessTokenPayload(),
    });
  });
}
