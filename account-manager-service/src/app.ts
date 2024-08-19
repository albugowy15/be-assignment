import Fastify from "fastify";
import middie from "@fastify/middie";
import fastifyEnv from "@fastify/env";
import { options } from "./config/environment";
import v1Routes from "./presentation/routes/v1";
import { AppError } from "./utils/error";
import bootstrapAppPlugin from "./plugins/bootstrap-app-plugin";

const app = Fastify({ logger: true });

app
  .register(fastifyEnv, options)
  .setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      reply
        .status(error.statusCode)
        .send({ status: "error", error: error.message });
    }
    request.log.error(error.message);
    reply.send(error);
  })
  .register(middie, { hook: "preHandler" })
  .register(bootstrapAppPlugin)
  .register(v1Routes, { prefix: "/v1/account" });

export default app;
