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
  receiverType: {
    $cond: {
      if: { $eq: ["$receiver.accountType", "Preparing"] },
      then: "It is checking...",
      else: "Finished",
    },
  },
  branch: {
    $switch: {
      branches: [
        {
          case: { $eq: ["$sender.bank.branchName", "Branch A"] },
          then: "Open Banking Name A",
        },
        {
          case: { $eq: ["$sender.bank.branchName", "Branch B"] },
          then: "Open Banking Name B",
        },
      ],
      default: "Unknown Branch",
    },
  },
};
