import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import { claimToken } from "../../utils/auth";

const transactionsController: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();
  app.get(
    "/",
    {
      schema: {
        description: "Get all authenticated user transactions",
        tags: ["transaction"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    async function (request, reply) {
      const claims = claimToken(request);
      const res = await app.transactionUseCase.getByUserId(claims.id);
      return reply.code(200).send({ status: "success", data: res });
    },
  );
};

export default transactionsController;
