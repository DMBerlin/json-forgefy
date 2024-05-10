import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "../common/get-value-by-path.common";

type EqOperatorInput = [unknown, unknown];

export function $eq(source?: Record<string, any>) {
  return function (values: EqOperatorInput): boolean {
    const prepare: Array<unknown> = values.map((value) => {
      if (typeof value === "object" && isOperator(value)) {
        return resolveExpression(source, value);
      }
      if (typeof value === "string" && isValidObjectPath(value)) {
        return getValueByPath(source, value);
      }
      return value;
    });
    return prepare[0] === prepare[1];
  };
}
