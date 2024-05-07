import { OperatorKey } from "../types/operator.types";

export type ExpressionType = {
  [K in OperatorKey]: unknown;
};
