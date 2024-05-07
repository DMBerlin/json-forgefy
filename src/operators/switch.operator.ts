import { resolveExpression } from "../common/resolve-expression.common";
import { ExpressionType } from "../types/expression.type";

interface SwitchOperatorInput {
  branches: Array<{ case: ExpressionType; then: unknown }>;
  default: unknown;
}

export function $switch(source?: Record<string, any>) {
  return function (input: SwitchOperatorInput) {
    for (const branch of input.branches) {
      if (resolveExpression(source, branch.case)) return branch.then;
    }
    return input.default;
  };
}
