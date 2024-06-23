export const websiteDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "repolution",
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth",
};
