import { Static, Type } from "@fastify/type-provider-typebox";

export const PaymentMethodSchema = Type.Union([
  Type.Literal("CARD"),
  Type.Literal("WALLET"),
]);

export const AccountCreateSchemaReq = Type.Object({
  payment_method_id: Type.Number(),
  account_number: Type.String({ minLength: 5, maxLength: 20 }),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
});

export type AccountCreateReq = Static<typeof AccountCreateSchemaReq>;

export const AccountCreateSchemaRes = Type.Object({
  id: Type.Number(),
});
export type AccountCreateRes = Static<typeof AccountCreateSchemaRes>;

export const AccountGetTransactionsByIdSchemaReq = Type.Object({
  id: Type.Number(),
});

export const AccountUpdateSchemaReq = Type.Object({
  payment_method_id: Type.Number(),
  account_number: Type.String({ minLength: 5, maxLength: 20 }),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
});
export type AccountUpdateReq = Static<typeof AccountUpdateSchemaReq>;

export const AccountUpdateParamSchemaReq = Type.Object({
  id: Type.Number(),
});

export const AccountDeleteParamSchemaReq = Type.Object({
  id: Type.Number(),
});
