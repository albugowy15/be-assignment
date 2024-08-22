import { FastifyEnvOptions } from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PAYMENT_SERVICE_PORT: number;
      SUPABASE_JWT_SECRET: string;
    };
  }
}

export const schema = {
  type: "object",
  required: ["PAYMENT_SERVICE_PORT", "SUPABASE_JWT_SECRET"],
  properties: {
    PAYMENT_SERVICE_PORT: {
      type: "number",
      default: 3001,
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
