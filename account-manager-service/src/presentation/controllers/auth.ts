import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import { AuthLoginSchemaReq, AuthRegisterSchemaReq } from "../schemas/auth";

const authController: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  const route = fastify.withTypeProvider<TypeBoxTypeProvider>();

  route.post(
    "/login",
    { schema: { body: AuthLoginSchemaReq } },
    async function (request, reply) {
      const res = await route.authUseCase.login(request.body);
      reply.code(201).send({ status: "success", data: res });
    },
  );

  route.post(
    "/register",
    { schema: { body: AuthRegisterSchemaReq } },
    async function (request, reply) {
      const res = await route.authUseCase.registerUser(request.body);
      reply.code(201).send({ status: "success", data: res });
    },
  );
};

export default authController;
