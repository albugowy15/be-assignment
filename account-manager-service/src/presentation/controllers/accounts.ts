import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import {
  AccountCreateSchemaReq,
  AccountDeleteParamSchemaReq,
  AccountGetTransactionsByIdSchemaReq,
  AccountUpdateParamSchemaReq,
  AccountUpdateSchemaReq,
} from "../schemas/account";
import { claimToken } from "../../utils/auth";

const accountsController: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  const route = fastify.withTypeProvider<TypeBoxTypeProvider>();

  route.post(
    "/",
    {
      schema: {
        description: "Create new user payment account",
        tags: ["account"],
        body: AccountCreateSchemaReq,
        response: {
          201: Type.Object({
            status: Type.String(),
            data: Type.Object({
              id: Type.Number(),
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
      const claims = claimToken(request);
      const res = await route.accountUseCase.create(request.body, claims.id);
      reply.code(201).send({ status: "success", data: res });
    },
  );

  route.get(
    "/:id/transactions",
    {
      schema: {
        description: "Get transactions by account id",
        tags: ["account", "transaction"],
        params: AccountGetTransactionsByIdSchemaReq,
        response: {
          200: Type.Object({
            status: Type.String(),
            data: Type.Array(Type.Object({})),
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
      const res = await route.accountUseCase.getTransactionsByAccountId(
        request.params.id,
      );
      reply.code(200).send({ status: "success", data: res });
    },
  );

  route.get(
    "/",
    {
      schema: {
        description: "Gel all authenticated user payment accounts",
        tags: ["account"],
        response: {
          200: Type.Object({
            status: Type.String(),
            data: Type.Array(Type.Object({})),
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
      const claims = claimToken(request);
      const res = await route.accountUseCase.getByUserId(claims.id);
      reply.code(200).send({ status: "success", data: res });
    },
  );

  route.put(
    "/:id",
    {
      schema: {
        description: "Update authenticated user payment account",
        tags: ["account"],
        params: AccountUpdateParamSchemaReq,
        body: AccountUpdateSchemaReq,
        response: {
          200: Type.Object({
            status: Type.String(),
            data: Type.Object({
              id: Type.Number(),
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
      const claims = claimToken(request);
      const res = await route.accountUseCase.update(
        request.params.id,
        request.body,
        claims.id,
      );
      reply.code(200).send({ status: "success", data: res });
    },
  );

  route.delete(
    "/:id",
    {
      schema: {
        description: "Update authenticated user payment account",
        tags: ["account"],
        body: AccountUpdateSchemaReq,
        params: AccountDeleteParamSchemaReq,
        response: {
          200: Type.Object({
            status: Type.String(),
            data: Type.Object({
              id: Type.Number(),
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
      const claims = claimToken(request);
      const res = await route.accountUseCase.delete(
        request.params.id,
        claims.id,
      );
      reply.code(200).send({ status: "success", data: res });
    },
  );
};

export default accountsController;
