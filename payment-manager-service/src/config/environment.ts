import { FastifyEnvOptions } from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      APP_PORT: number;
      DATABASE_URL: string;
      DIRECT_URL: string;
      SUPABASE_JWT_SECRET: string;
    };
  }
}

export const schema = {
  type: "object",
  required: ["APP_PORT", "DATABASE_URL", "DIRECT_URL", "SUPABASE_JWT_SECRET"],
  properties: {
    APP_PORT: {
      type: "number",
      default: 8000,
    },
    DATABASE_URL: {
      type: "string",
    },
    DIRECT_URL: {
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
