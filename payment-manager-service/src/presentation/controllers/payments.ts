import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import {
  PaymentRecurringSchemaReq,
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
        description: "Create send payment",
        tags: ["payment"],
        body: PaymentSendSchemaReq,
        response: {
          201: Type.Object({
            status: Type.String(),
            data: Type.Object({
              transaction_id: Type.Number(),
              payment_history_id: Type.Number(),
            }),
          }),
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    async function (request, reply) {
      const claim = claimToken(request);
      const res = await app.transactionUseCase.sendPaymentFromUser(
        app.db,
        request.body,
        claim.id,
      );
      return reply.code(201).send({ status: "success", data: res });
    },
  );
  app.post(
    "/withdraw",
    {
      schema: {
        description: "Create withdraw payment",
        tags: ["payment"],
        body: PaymentWithdrawSchemaReq,
        response: {
          201: Type.Object({
            status: Type.String(),
            data: Type.Object({
              transaction_id: Type.Number(),
              payment_history_id: Type.Number(),
            }),
          }),
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    async function (request, reply) {
      const claim = claimToken(request);
      const res = await app.transactionUseCase.withdrawPaymentForUser(
        app.db,
        request.body,
        claim.id,
      );
      return reply.code(201).send({ status: "success", data: res });
    },
  );
  app.post(
    "/recurring",
    {
      schema: {
        description: "Create recurring payment",
        tags: ["payment"],
        body: PaymentRecurringSchemaReq,
        response: {
          201: Type.Object({
            status: Type.String(),
            data: Type.Object({
              id: Type.Number(),
            }),
          }),
        },
      },
    },
    async function (request, reply) {
      const claims = claimToken(request);
      const res = await app.transactionUseCase.recurringPaymentFromUser(
        request.body,
        claims.id,
      );
      return reply.code(201).send({ status: "success", data: res });
    },
  );
};

export default paymentsController;
