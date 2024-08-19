import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyPluginAsync } from "fastify";
import { AuthLoginSchemaReq, AuthRegisterSchemaReq } from "../schemas/auth";

const authController: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  const route = fastify.withTypeProvider<TypeBoxTypeProvider>();

  route.post(
    "/login",
    {
      schema: {
        description: "Login a user",
        tags: ["auth"],
        body: AuthLoginSchemaReq,
        response: {
          200: Type.Object({
            status: Type.String(),
            data: Type.Object({
              id: Type.String(),
              token: Type.String(),
              refresh_token: Type.String(),
            }),
          }),
        },
      },
    },
    async function (request, reply) {
      const res = await route.authUseCase.login(request.body);
      return reply.code(200).send({
        status: "success",
        data: {
          id: res.user.id,
          token: res.access_token,
          refresh_token: res.refresh_token,
        },
      });
    },
  );

  route.post(
    "/register",
    {
      schema: {
        description: "Register a user",
        tags: ["auth"],
        body: AuthRegisterSchemaReq,
        response: {
          201: Type.Object({
            status: Type.String(),
            data: Type.Object({
              id: Type.String(),
            }),
          }),
        },
      },
    },
    async function (request, reply) {
      const res = await route.authUseCase.registerUser(request.body);
      return reply.code(201).send({ status: "success", data: { id: res.id } });
    },
  );
};

export default authController;
