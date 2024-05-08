# JSON-FORGEFY

## Ideia:

The idea of this package is to provide a way to transform an upcoming JSON string into a new Object, following a blueprint configuration file.

This came with the necessity of consuming 3rd services API where you can setup a JSON Schema Like configuration file to obtain the desired JSON structure as response, before sending it forward to the next downstream service.

The purpose of this package is to make it heavily agnostic of the system. You don't have to bother parsing each prop from A to B, just provide the blueprint and let the package do the rest.

This is heavily inspired on the MongoDB aggregation pipeline, where you can transform the data as you wish. I'll try to add as much operators as needed, following their official documentation.

## Example:

```ts
// INCOMMING JSON STRING
export const actual = {
  transactionId: "1234567890",
  transactionType: "Money Transfer",
  transactionDate: "2024-01-01T00:00:00Z",
  transactionStatus: "Pending",
  sender: {
    accountId: "A123",
    accountType: "Savings",
    bank: {
      bankId: "B123",
      bankName: "Bank A",
      branchName: "Branch A",
      ifscCode: "IFSC123",
      swiftCode: "SWIFT123",
      address: {
        street: "Street A",
        city: "City A",
        state: "State A",
        country: "Country A",
        zipCode: "ZIP123",
      },
    },
  },
  receiver: {
    accountId: "B456",
    accountType: "Checking",
    bank: {
      bankId: "B456",
      bankName: "Bank B",
      branchName: "Branch B",
      ifscCode: "IFSC456",
      swiftCode: "SWIFT456",
      address: {
        street: "Street B",
        city: "City B",
        state: "State B",
        country: "Country B",
        zipCode: "ZIP456",
      },
    },
  },
  transactionDetails: {
    amount: "1000.0",
    currency: "USD",
    exchangeRate: "1.0",
    transactionFee: "10.0",
    netAmount: "990.0",
    description: "Money Transfer to Account B456",
  },
};
```

The object above - as example - is the incoming JSON string that you want to transform into a new object. You want to obtain the following result at the end:

```ts
export const expected = {
  accountId: "A123",
  accountType: "Savings",
  transactionId: "1234567890",
  transactionStatus: "PENDING",
  transactionDetails: {
    amount: 100000,
    currency: "USD",
    fees: { transactionFee: "10.0", netAmount: "990.0" },
  },
};
```

To do so, we just need to specify a blueprint configuration file, like the following:

```ts
export const blueprint = {
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

```

## How to:

Import the `forgefy` function from the package and pass two inputs, the incoming JSON string and the blueprint configuration file.

```ts
import { forgefy } from "json-forgefy";
const result = forgefy(actual, blueprint);
```
