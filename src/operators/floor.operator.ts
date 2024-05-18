import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { FloorOperatorInput } from "@/types/operator-input.types";

export const $floor: ExecutableExpression<FloorOperatorInput, number> = () => {
  return function (value: FloorOperatorInput): number {
    return Math.floor(value);
  };
};
