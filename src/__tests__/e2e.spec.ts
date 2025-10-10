import { Forgefy } from "..";

describe("E2E PIX DEBIT Transaction", () => {
  const actual = {
    transaction: {
      id: "bfb2821f-b8ba-4595-9e4e-484e20f576d0",
      description: "Transferência enviada|Karla Polla Dias",
      descriptionRaw: "Transferência enviada|Karla Polla Dias",
      currencyCode: "BRL",
      amount: -0.02,
      amountInAccountCurrency: null,
      date: "2024-12-09T21:56:58.601Z",
      category: "Same person transfer",
      categoryId: "04000000",
      balance: null,
      accountId: "c8f0ddf2-c516-4a25-8fc3-d0fd29ce76a6",
      providerCode: null,
      status: "POSTED",
      paymentData: {
        payer: {
          accountNumber: null,
          branchNumber: null,
          documentNumber: {
            type: "CPF",
            value: "122.163.529-85",
          },
          name: null,
          routingNumber: null,
          routingNumberISPB: null,
        },
        paymentMethod: "PIX",
        reason: null,
        receiver: {
          accountNumber: "01002583-7",
          branchNumber: "2491",
          documentNumber: {
            type: "CPF",
            value: "122.163.529-85",
          },
          name: null,
          routingNumber: "033",
          routingNumberISPB: "90400888",
        },
        receiverReferenceId: null,
        referenceNumber: null,
        boletoMetadata: null,
      },
      type: "DEBIT",
      operationType: "PIX",
      creditCardMetadata: null,
      acquirerData: null,
      merchant: null,
      providerId: "675767aa-d7ae-3a8f-8502-c5f629bbe435",
      createdAt: "2025-10-09T12:59:28.508Z",
      updatedAt: "2025-10-09T12:59:28.508Z",
    },
  };

  const blueprint = {
    id: "$transaction.id",
    type: "DEBIT",
    operation_type: "PIX_DEBIT",
    description: {
      $ifNull: ["$transaction.description", ""],
    },
    balance: {
      $cond: {
        if: {
          $or: [
            {
              $isNull: "$transaction.balance",
            },
            {
              $eq: [
                {
                  $toString: "$transaction.balance",
                },
                "",
              ],
            },
            {
              $not: {
                $or: [
                  {
                    $eq: ["$transaction.balance", 0],
                  },
                  {
                    $regex: {
                      value: {
                        $toString: "$transaction.balance",
                      },
                      pattern: "^-?\\d+(\\.\\d+)?$",
                    },
                  },
                ],
              },
            },
          ],
        },
        then: "",
        else: {
          $toString: {
            $toFixed: {
              value: {
                $multiply: [
                  {
                    $toNumber: "$transaction.balance",
                  },
                  100,
                ],
              },
              precision: 0,
            },
          },
        },
      },
    },
    amount: {
      $toString: {
        $toFixed: {
          value: {
            $abs: {
              $multiply: [
                {
                  $cond: {
                    if: {
                      $regex: {
                        value: {
                          $toString: "$transaction.amount",
                        },
                        pattern: "^-?\\d+(\\.\\d+)?$",
                      },
                    },
                    then: {
                      $toNumber: "$transaction.amount",
                    },
                    else: 0,
                  },
                },
                100,
              ],
            },
          },
          precision: 0,
        },
      },
    },
    transaction_date: "$transaction.date",
    document: "",
    receiver: {
      document: {
        $cond: {
          if: {
            $or: [
              {
                $isNull:
                  "$transaction.paymentData.receiver.documentNumber.value",
              },
              {
                $eq: [
                  {
                    $toString:
                      "$transaction.paymentData.receiver.documentNumber.value",
                  },
                  "",
                ],
              },
            ],
          },
          then: "",
          else: {
            $replace: {
              input: {
                $toString:
                  "$transaction.paymentData.receiver.documentNumber.value",
              },
              pattern: "/\\D+/g",
              replacement: "",
            },
          },
        },
      },
      bank_branch_number: {
        $ifNull: ["$transaction.paymentData.receiver.branchNumber", ""],
      },
      bank_account_number: {
        $ifNull: ["$transaction.paymentData.receiver.accountNumber", ""],
      },
    },
    id_end_to_end: "",
    transfer_type: "1",
    amount_details: {
      fees: {
        fine: "0",
        discount: "0",
        interest: "0",
      },
      final: {
        $toString: {
          $toFixed: {
            value: {
              $abs: {
                $multiply: [
                  {
                    $cond: {
                      if: {
                        $regex: {
                          value: {
                            $toString: "$transaction.amount",
                          },
                          pattern: "^-?\\d+(\\.\\d+)?$",
                        },
                      },
                      then: {
                        $toNumber: "$transaction.amount",
                      },
                      else: 0,
                    },
                  },
                  100,
                ],
              },
            },
            precision: 0,
          },
        },
      },
      original: {
        $toString: {
          $toFixed: {
            value: {
              $abs: {
                $multiply: [
                  {
                    $cond: {
                      if: {
                        $regex: {
                          value: {
                            $toString: "$transaction.amount",
                          },
                          pattern: "^-?\\d+(\\.\\d+)?$",
                        },
                      },
                      then: {
                        $toNumber: "$transaction.amount",
                      },
                      else: 0,
                    },
                  },
                  100,
                ],
              },
            },
            precision: 0,
          },
        },
      },
    },
  };

  const expected = {
    id: "bfb2821f-b8ba-4595-9e4e-484e20f576d0",
    type: "DEBIT",
    amount: "2",
    balance: "",
    document: "",
    receiver: {
      document: "12216352985",
      bank_branch_number: "2491",
      bank_account_number: "01002583-7",
    },
    description: "Transferência enviada|Karla Polla Dias",
    id_end_to_end: "",
    transfer_type: "1",
    amount_details: {
      fees: {
        fine: "0",
        discount: "0",
        interest: "0",
      },
      final: "2",
      original: "2",
    },
    operation_type: "PIX_DEBIT",
    transaction_date: "2024-12-09T21:56:58.601Z",
  };

  it("should transform transaction payload correctly with corrected blueprint", () => {
    const result = Forgefy.this(actual, blueprint);
    expect(result).toEqual(expected);
  });
});
