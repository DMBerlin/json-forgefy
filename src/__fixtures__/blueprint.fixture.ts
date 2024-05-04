export const blueprintFixture = {
  accountId: "$sender.accountId",
  accountType: "$sender.accountType",
  transactionId: "$transactionId",
  transactionStatus: { $toUpper: "$transactionStatus" },
  transactionDetails: {
    amount: {
      $multiply: [{ $toNumber: "$transactionDetails.amount" }, 100],
    },
    currency: "$transactionDetails.currency",
    fees: {
      transactionFee: "$transactionDetails.transactionFee",
      netAmount: "$transactionDetails.netAmount",
    },
  },
};
