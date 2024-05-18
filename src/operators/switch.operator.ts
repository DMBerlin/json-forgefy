import { resolveExpression } from "@common/resolve-expression.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { SwitchOperatorInput } from "@/types/operator-input.types";

export const $switch = (ctx?: ExecutionContext) => {
  return function (value: SwitchOperatorInput) {
    for (const branch of value.branches) {
      if (resolveExpression(ctx.context, branch.case)) return branch.then;
    }
    return value.default;
  };
};
