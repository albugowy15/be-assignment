import { FastifyEnvOptions } from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      APP_PORT: number;
      DATABASE_URL: string;
      DIRECT_URL: string;
      SUPABASE_KEY: string;
      SUPABASE_URL: string;
    };
  }
}

export const schema = {
  type: "object",
  required: [
    "APP_PORT",
    "DATABASE_URL",
    "DIRECT_URL",
    "SUPABASE_KEY",
    "SUPABASE_URL",
  ],
  properties: {
    APP_PORT: {
      type: "number",
      default: 8080,
    },
    DATABASE_URL: {
      type: "string",
    },
    DIRECT_URL: {
      type: "string",
    },
    SUPABASE_KEY: {
      type: "string",
    },
    SUPABASE_URL: {
      type: "string",
    },
  },
};

export const options: FastifyEnvOptions = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};
