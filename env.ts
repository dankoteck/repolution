import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // Validations
  server: {
    NODE_ENV: z.string().optional(),
    TURSO_CONNECTION_URL: z.string().min(1),
    TURSO_AUTH_TOKEN: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
  },

  client: {},

  // Runtime environment variables
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
});
