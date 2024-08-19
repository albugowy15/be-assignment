import { FastifyPluginAsync } from "fastify";
import authController from "../controllers/auth";
import transactionsController from "../controllers/transactions";
import accountsController from "../controllers/accounts";

const v1Routes: FastifyPluginAsync = async function (fastify, _opts) {
  fastify
    .register(authController, { prefix: "/auth" })
    .register(protectedRoutes);
};

const protectedRoutes: FastifyPluginAsync = async function (fastify, _opts) {
  fastify
    .addHook("preHandler", async (req) => {
      const headers = req.headers;
      const jwtToken = headers["authorization"]?.split(" ")[1];
      await fastify.authUseCase.getUser(jwtToken);
    })
    .register(accountsController, { prefix: "/accounts" })
    .register(transactionsController, { prefix: "/transactions" });
};

export default v1Routes;
