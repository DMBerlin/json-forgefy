import { OperatorKey } from "../types/operator.types";

export type ExpressionTypes = {
  [K in OperatorKey]: unknown;
};
