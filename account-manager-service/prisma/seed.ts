import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const result = await prisma.paymentMethod.createMany({
    data: [
      {
        payment_method_type: "CARD",
        name: "VISA",
      },
      {
        payment_method_type: "CARD",
        name: "MASTERCARD",
      },
      {
        payment_method_type: "WALLET",
        name: "PAYPAL",
      },
      {
        payment_method_type: "WALLET",
        name: "GOOGLE PAY",
      },
    ],
  });
  console.log(result);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
