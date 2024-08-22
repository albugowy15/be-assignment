import { FastifyEnvOptions } from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      ACCOUNT_SERVICE_PORT: number;
      SUPABASE_KEY: string;
      SUPABASE_URL: string;
      SUPABASE_JWT_SECRET: string;
    };
  }
}

export const schema = {
  type: "object",
  required: [
    "ACCOUNT_SERVICE_PORT",
    "SUPABASE_KEY",
    "SUPABASE_URL",
    "SUPABASE_JWT_SECRET",
  ],
  properties: {
    ACCOUNT_SERVICE_PORT: {
      type: "number",
      default: 3000,
    },
    SUPABASE_KEY: {
      type: "string",
    },
    SUPABASE_URL: {
      type: "string",
    },
    SUPABASE_JWT_SECRET: {
      type: "string",
    },
  },
};

export const options: FastifyEnvOptions = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};
