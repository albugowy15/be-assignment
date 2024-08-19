import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import {
  PaymentSendSchemaReq,
  PaymentWithdrawSchemaReq,
} from "../schemas/payment";
import { claimToken } from "../../utils/auth";

const paymentsController: FastifyPluginAsync = async (fastify, _opts) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  app.post(
    "/send",
    {
      schema: {
        body: PaymentSendSchemaReq,
      },
    },
    async function (request, reply) {
      const claim = claimToken(request);
      const res = await app.transactionUseCase.sendPaymentFromUser(
        app.db,
        request.body,
        claim.id,
      );
      reply.status(201).send({ status: "success", data: res });
    },
  );
  app.post(
    "/withdraw",
    {
      schema: {
        body: PaymentWithdrawSchemaReq,
      },
    },
    async function (request, reply) {
      const claim = claimToken(request);
      const res = await app.transactionUseCase.withdrawPaymentForUser(
        app.db,
        request.body,
        claim.id,
      );
      reply.status(201).send({ status: "success", data: res });
    },
  );
};

export default paymentsController;
