import { ExecutionContext } from "../interfaces/execution-context.interface";
import { OperatorInput } from "../types/operator.types";

export type ExecutableExpression<P extends OperatorInput, R = unknown> = (
  ctx?: ExecutionContext,
) => (value: P) => R;
