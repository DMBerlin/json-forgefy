import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { FloorOperatorInput } from "../types/inputs.types";

export const $floor: ExecutableExpression<FloorOperatorInput, number> = () => {
  return function (value: FloorOperatorInput): number {
    return Math.floor(value);
  };
};
