import { User } from "supertokens-node/types";

export type UserMetadata = {
  userInfo: User | undefined;
  sessionHandle: string;
  accessTokenPayload: any;
};
