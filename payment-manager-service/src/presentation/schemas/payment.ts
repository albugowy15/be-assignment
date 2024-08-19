import { Static, Type } from "@fastify/type-provider-typebox";

export const PaymentSendSchemaReq = Type.Object({
  amount: Type.Number({ minimum: 0 }),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
  account_id: Type.Number(),
});
export type PaymentSendReq = Static<typeof PaymentSendSchemaReq>;

export const PaymentWithdrawSchemaReq = Type.Object({
  amount: Type.Number({ minimum: 0 }),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
  account_id: Type.Number(),
});
export type PaymentWithdrawReq = Static<typeof PaymentWithdrawSchemaReq>;
