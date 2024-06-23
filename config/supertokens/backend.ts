import SuperTokens from "supertokens-node";
import PasswordlessNode from "supertokens-node/recipe/passwordless";
import SessionNode from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import { appInfo } from "./appInfo";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      PasswordlessNode.init({
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        contactMethod: "EMAIL_OR_PHONE",
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
