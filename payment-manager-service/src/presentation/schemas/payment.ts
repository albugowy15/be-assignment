import { Static, Type } from "@fastify/type-provider-typebox";

export const PaymentSendSchemaReq = Type.Object({
  amount: Type.Number({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER }),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
  account_id: Type.Number(),
});
export type PaymentSendReq = Static<typeof PaymentSendSchemaReq>;

export const PaymentWithdrawSchemaReq = Type.Object({
  amount: Type.Number({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER }),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
  account_id: Type.Number(),
});
export type PaymentWithdrawReq = Static<typeof PaymentWithdrawSchemaReq>;

export const PaymentRecurringSchemaReq = Type.Object({
  account_id: Type.Number(),
  currency: Type.String({ minLength: 3, maxLength: 3 }),
  amount: Type.Number({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER }),
  interval: Type.Union([
    Type.Literal("DAILY"),
    Type.Literal("WEEKLY"),
    Type.Literal("MONTHLY"),
    Type.Literal("ANNUALLY"),
  ]),
});
export type PaymentRecurringReq = Static<typeof PaymentRecurringSchemaReq>;
