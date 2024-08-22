import { FastifyPluginAsync } from "fastify";
import authController from "../controllers/auth";
import transactionsController from "../controllers/transactions";
import accountsController from "../controllers/accounts";
import jwt from "@fastify/jwt";

const v1Routes: FastifyPluginAsync = async function (fastify, _opts) {
  fastify
    .register(authController, { prefix: "/auth" })
    .register(protectedRoutes);
};

const protectedRoutes: FastifyPluginAsync = async function (fastify, _opts) {
  fastify
    .register(jwt, {
      secret: fastify.config.SUPABASE_JWT_SECRET,
      formatUser(payload) {
        return {
          // @ts-ignore
          id: payload.sub,
          // @ts-ignore
          email: payload.email,
        };
      },
    })
    .addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.code(403).send({ status: "error", error: "invalid jwt token" });
      }
    })
    .register(accountsController, { prefix: "/accounts" })
    .register(transactionsController, { prefix: "/transactions" });
};

export default v1Routes;
