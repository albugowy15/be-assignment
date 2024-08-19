import Fastify from "fastify";
import middie from "@fastify/middie";
import fastifyEnv from "@fastify/env";
import { options } from "./config/environment";
import v1Routes from "./presentation/routes/v1";
import { AppError } from "./utils/error";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
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
    reply.code(500).send({ status: "error", error: "Internal server error" });
  })
  .setNotFoundHandler((_request, reply) => {
    reply.code(404).send({ status: "error", error: "Route not found" });
  })
  .register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Account Manager Service Swagger Documentation",
        description:
          "Swagger documentation for account manager service. To simply test authentication and access protected routes, please login using testuser@gmail.com with password testuser",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Service server",
        },
        {
          url: "http://localhost:8000/account",
          description: "Gateway server",
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
