import { Static, Type } from "@fastify/type-provider-typebox";

export const AuthRegisterSchemaReq = Type.Object({
  email: Type.String({
    format: "email",
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 16,
  }),
});
export type AuthRegisterReq = Static<typeof AuthRegisterSchemaReq>;

export const AuthLoginSchemaReq = Type.Object({
  email: Type.String({
    format: "email",
  }),
  password: Type.String(),
});
export type AuthLoginReq = Static<typeof AuthLoginSchemaReq>;

export type RegisterRes = {
  id: string;
  email: string;
};
