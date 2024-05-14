import { FloorOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $floor: ExecutableExpression<FloorOperatorInput, number> = () => {
  return function (value: FloorOperatorInput): number {
    return Math.floor(value);
  };
};
