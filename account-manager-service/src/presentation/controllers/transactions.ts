import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";

const transactionsController: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();
  app.get("/", async function (_request, reply) {
    const uid = await app.authUseCase.getUid();
    const res = await app.transactionUseCase.getByUserId(uid);
    return reply.code(200).send({ status: "success", data: res });
  });
};

export default transactionsController;
