import { resolveExpression } from "../common/resolve-expression.common";
import { ExpressionType } from "../types/expression.type";

type CondOperatorInput = {
  if: ExpressionType;
  then: unknown;
  else: unknown;
};

export function $cond(source?: Record<string, any>) {
  return function (value: CondOperatorInput): unknown {
    return resolveExpression(source, value.if) ? value.then : value.else;
  };
}
