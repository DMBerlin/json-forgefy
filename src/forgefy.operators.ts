import { toString } from "./operators/to-string.operator";
import { toNumber } from "./operators/to-number.operator";
import { toUpper } from "./operators/to-upper.operator";
import { ifNull } from "./operators/if-null.operator";
import { multiply } from "./operators/multiply.operator";
import { OperatorKey, OperatorValue } from "./types/operator.types";

export const operators: Map<string, (...any: any[]) => any> = new Map<
  OperatorKey,
  OperatorValue
>()
  .set("$toString", toString)
  .set("$toNumber", toNumber)
  .set("$toUpper", toUpper)
  .set("$ifNull", ifNull)
  .set("$multiply", multiply);
