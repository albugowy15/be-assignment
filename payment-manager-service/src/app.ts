import Fastify from "fastify";
import middie from "@fastify/middie";
import fastifyEnv from "@fastify/env";
import { options } from "./config/environment";
import v1Routes from "./presentation/routes/v1";
import { AppError } from "./utils/error";
import bootstrapAppPlugin from "./plugins/bootstrap-app-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const app = Fastify({ logger: true });

app
  .register(fastifyEnv, options)
  .setErrorHandler((error, request, reply) => {
    if (error.validation) {
      return reply.status(400).send({ status: "error", error: error.message });
    }
    if (error instanceof AppError) {
      return reply
        .status(error.statusCode)
        .send({ status: "error", error: error.message });
    }
    request.log.error(error.message);
    return reply
      .code(error.statusCode || 500)
      .send({ status: "error", error: error.message });
  })
  .setNotFoundHandler((_request, reply) => {
    return reply.code(404).send({ status: "error", error: "Route not found" });
  })
  .register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Payment Manager Service Swagger Documentation",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3001",
          description: "Service server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  })
  .register(swaggerUi)
  .register(middie, { hook: "preHandler" })
  .register(bootstrapAppPlugin)
  .register(v1Routes, { prefix: "/v1" });

export default app;
