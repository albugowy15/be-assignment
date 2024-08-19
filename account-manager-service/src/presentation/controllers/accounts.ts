import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import {
  AccountCreateSchemaReq,
  AccountGetTransactionsByIdSchemaReq,
} from "../schemas/account";

const accountsController: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  const route = fastify.withTypeProvider<TypeBoxTypeProvider>();

  route.post(
    "/",
    { schema: { body: AccountCreateSchemaReq } },
    async function (request, reply) {
      const uid = await route.authUseCase.getUid();
      const res = await route.accountUseCase.create(request.body, uid);
      reply.code(201).send({ status: "success", data: res });
    },
  );
  route.get(
    "/:id/transactions",
    { schema: { params: AccountGetTransactionsByIdSchemaReq } },
    async function (request, reply) {
      const res = await route.accountUseCase.getTransactionsByAccountId(
        request.params.id,
      );
      reply.code(200).send({ status: "success", data: res });
    },
  );

  route.get("/", async function (_request, reply) {
    const uid = await route.authUseCase.getUid();
    const res = await route.accountUseCase.getByUserId(uid);
    reply.code(200).send({ status: "success", data: res });
  });
};

export default accountsController;
